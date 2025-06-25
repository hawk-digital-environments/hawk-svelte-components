import * as path from 'node:path';
import * as fs from 'node:fs';
import type {ViteDevServer} from 'vite';
import {parse as parseHtml} from 'node-html-parser';
import {getGeneratedWarning, loadOptimizedSvg, makeHumanReadable} from './utils.js';

interface VitePluginIllustrationOptions {
    /**
     * The path to the directory containing the illustration component.
     * Relative to the project root.
     */
    directory?: string;

    /**
     * The path to the directory containing the icons.
     * Relative to the `directory`.
     */
    sourceDirectory?: string;
}

export const VitePluginIllustrations = function (options?: VitePluginIllustrationOptions) {
    const {
        directory = 'src/lib/illustration',
        sourceDirectory = 'icons'
    } = options ?? {};

    const outFile = path.resolve(directory, 'illustrationDefinition.ts');
    const absoluteSourceDirectory = path.join(process.cwd(), directory, sourceDirectory);

    return {
        name: 'vite-plugin-illustrations',
        async buildStart() {
            buildIllustrationDefinition(absoluteSourceDirectory, outFile);
        },
        configureServer(server: ViteDevServer) {
            server.watcher.add([
                absoluteSourceDirectory,
                path.join(absoluteSourceDirectory, '*.svg')
            ]);
            server.watcher.on('add', (changedPath: string) => {
                if (changedPath.startsWith(absoluteSourceDirectory)) {
                    buildIllustrationDefinition(absoluteSourceDirectory, outFile);
                }
            });
            server.watcher.on('change', (changedPath: string) => {
                if (changedPath.startsWith(absoluteSourceDirectory)) {
                    buildIllustrationDefinition(absoluteSourceDirectory, outFile);
                }
            });
            server.watcher.on('unlink', (changedPath: string) => {
                if (changedPath.startsWith(absoluteSourceDirectory)) {
                    buildIllustrationDefinition(absoluteSourceDirectory, outFile);
                }
            });
        }
    };
};

interface IllustrationInfo {
    c: string;
    t: string;
}

interface Illustration {
    name: string;
    info: IllustrationInfo;
}

function buildIllustrationDefinition(sourceDirectory: string, outFile: string) {
    console.log('Building illustration definition...');
    const illustrations = loadIllustrations(sourceDirectory);
    const content = getGeneratedWarning() + generateAllowedList(illustrations) + generateIllustrationMap(illustrations) + generateIllustrationArgType();
    fs.writeFileSync(outFile, content);
    console.log('Illustrations built.');
}

function loadIllustrations(sourceDirectory: string): Illustration[] {
    const files = fs.readdirSync(sourceDirectory);
    const illustrations: Illustration[] = [];

    files.forEach((file) => {
        if (file.endsWith('.svg')) {
            const realName = makeIllustrationName(file);
            const iconPath = path.resolve(sourceDirectory, file);
            const info = generateIllustrationInfo(realName, iconPath);
            if (info) {
                illustrations.push({name: realName, info: info});
            } else {
                console.error(`Failed to load illustration from ${iconPath}`);
            }
        }
    });

    return illustrations;
}

function makeIllustrationName(filename: string): string {
    return filename.replace(/\.svg$/, '')
        .replace(/^illustration-/, '')
        .replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

function generateAllowedList(illustrations: Illustration[]): string {
    return `
export const allowedIllustrationNames = ['${illustrations.map(({name}) => name).join('\', \'')}'] as const;
export type IllustrationName = typeof allowedIllustrationNames[number];
`;
}

function generateIllustrationMap(illustrations: Illustration[]): string {
    return `
export interface IllustrationInfo {
    c: string;
    t: string;
}

export const illustrations = new Map<IllustrationName, IllustrationInfo>([
    ${illustrations.map(({name, info}) =>
        `['${name}', ${JSON.stringify(info)}]`).join(',\n    ')}
]);
`;
}

function generateIllustrationInfo(realName: string, path: string): IllustrationInfo | null {
    const content = loadOptimizedSvg(path);
    const root = parseHtml(content);
    const svgTag = root.querySelector('svg');

    if (!svgTag) {
        console.error(`The file ${path} does not contain a valid SVG tag. Skipping...`);
        return null;
    }

    return {c: svgTag.innerHTML, t: makeHumanReadable(realName)};
}

function generateIllustrationArgType(): string {
    return `
/**
 * A helper for Storybook to generate the illustration select control.
 * We need to add the stupid space to the name to make it work without printing out stuff like { [native code]: 'icon' }.
 */
export function illustrationArgType(): any {
    return {
        control: {
            type: 'select',
            labels: allowedIllustrationNames.reduce(
                (acc, i) => ({...acc, [i + ' ']: i}), {}
            )
        },
        options: allowedIllustrationNames
    };
}
`;
}
