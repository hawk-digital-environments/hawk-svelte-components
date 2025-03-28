import * as path from 'node:path';
import * as fs from 'node:fs';
import {optimize} from 'svgo';
import type {ViteDevServer} from 'vite';
import {parse as parseHtml} from 'node-html-parser';

interface VitePluginIconsOptions {
    /**
     * The path to the directory containing the icon component.
     * Relative to the project root.
     */
    directory?: string;

    /**
     * The path to the directory containing the filled icons.
     * Relative to the `directory`.
     */
    filledDirectory?: string;

    /**
     * The path to the directory containing the outline icons.
     * Relative to the `directory`.
     */
    outlineDirectory?: string;
}

export const VitePluginIcons = function (options?: VitePluginIconsOptions) {
    const {
        directory = 'src/lib/icon',
        filledDirectory = 'icons/filled',
        outlineDirectory = 'icons/outline'
    } = options ?? {};

    const outFile = path.resolve(directory, 'iconDefinition.ts');
    const absoluteFilledDirectory = path.join(process.cwd(), directory, filledDirectory);
    const absoluteOutlineDirectory = path.join(process.cwd(), directory, outlineDirectory);

    return {
        name: 'vite-plugin-icons',
        async buildStart() {
            buildIconDefinition(absoluteFilledDirectory, absoluteOutlineDirectory, outFile);
        },
        configureServer(server: ViteDevServer) {
            server.watcher.add([
                absoluteFilledDirectory,
                absoluteOutlineDirectory,
                path.join(absoluteFilledDirectory, '*.svg'),
                path.join(absoluteOutlineDirectory, '*.svg')
            ]);
            server.watcher.on('add', (changedPath: string) => {
                if (changedPath.startsWith(absoluteFilledDirectory) || changedPath.startsWith(absoluteOutlineDirectory)) {
                    buildIconDefinition(absoluteFilledDirectory, absoluteOutlineDirectory, outFile);
                }
            });
            server.watcher.on('change', (changedPath: string) => {
                if (changedPath.startsWith(absoluteFilledDirectory) || changedPath.startsWith(absoluteOutlineDirectory)) {
                    buildIconDefinition(absoluteFilledDirectory, absoluteOutlineDirectory, outFile);
                }
            });
            server.watcher.on('unlink', (changedPath: string) => {
                if (changedPath.startsWith(absoluteFilledDirectory) || changedPath.startsWith(absoluteOutlineDirectory)) {
                    buildIconDefinition(absoluteFilledDirectory, absoluteOutlineDirectory, outFile);
                }
            });
        }
    }
}

interface IconInfo {
    w: number;
    h: number;
    c: string;
    t: string;
}

interface IconSet {
    name: string;
    filled: IconInfo;
    outline: IconInfo;
}

function buildIconDefinition(filledDirectory: string, outlineDirectory: string, outFile: string) {
    console.log('Building icon set...');
    const icons = gatherSets(filledDirectory, outlineDirectory);
    const content = getGeneratedWarning() + generateAllowedList(icons) + generateIconMap(icons);
    fs.writeFileSync(outFile, content);
    console.log('Icon set built.');
}

function gatherSets(filledDirectory: string, outlineDirectory: string): IconSet[] {
    const filled = fs.readdirSync(filledDirectory);
    const outline = fs.readdirSync(outlineDirectory);

    const map = new Map<string, IconSet>();

    filled.forEach((name) => {
        const realName = makeIconName(name);
        const iconPath = path.resolve(filledDirectory, name);
        const iconInfo = generateIconInfo(realName, iconPath);
        if (!iconInfo) {
            return;
        }
        map.set(realName, {name: realName, filled: iconInfo, outline: iconInfo});
    });

    outline.forEach((name) => {
        const realName = makeIconName(name);
        const iconPath = path.resolve(outlineDirectory, name);
        const iconInfo = generateIconInfo(realName, iconPath);
        if (!iconInfo) {
            return;
        }
        if (map.has(realName)) {
            map.get(realName)!.outline = iconInfo;
        } else {
            map.set(realName, {name: realName, filled: iconInfo, outline: iconInfo});
        }
    });

    return Array.from(map.values());
}

function makeIconName(filename: string): string {
    return filename.replace(/\.svg$/, '')
        .replace(/^icon-/, '')
        .replace(/-filled$/, '')
        .replace(/-outlined$/, '')
        .replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

function makeHumanReadable(name: string): string {
    return name
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (s) => s.toUpperCase());
}

function getGeneratedWarning(): string {
    return `// THIS FILE IS GENERATED. DO NOT MODIFY IT! To refresh, restart the dev server.`;
}

function generateAllowedList(icons: IconSet[]): string {
    return `
export const allowedIconNames = ['${icons.map(({name}) => name).join("', '")}'] as const;
export type IconName = typeof allowedIconNames[number];
`;
}

function generateIconMap(icons: IconSet[]): string {
    return `
export interface IconInfo {
    w: number;
    h: number;
    c: string;
    t: string;
}

export const icons = new Map<IconName, { filled: IconInfo, outline: IconInfo }>([
    ${icons.map(({name, filled, outline}) =>
        `['${name}', ${JSON.stringify({filled, outline})}]`).join(',\n    ')}
]);
`;
}

function loadOptimizedSvg(path: string): string {
    const rawContent = fs.readFileSync(path, 'utf-8');
    const result = optimize(rawContent, {
        path: path, // recommended
        multipass: true // all other config fields are available here
    }).data;

    // Ensure that all single quotes are escaped
    return result.replace(/'/g, "\\'").replace(/\n/g, '');
}

function generateIconInfo(realName: string, path: string): IconInfo | null {
    const content = loadOptimizedSvg(path);
    const root = parseHtml(content);
    const svgTag = root.querySelector('svg');

    if (!svgTag) {
        console.error(`The file ${path} does not contain a valid SVG tag. Skipping...`);
        return null;
    }

    const width = parseInt(svgTag.getAttribute('width') ?? '0');
    const height = parseInt(svgTag.getAttribute('height') ?? '0');

    return {w: width, h: height, c: svgTag.innerHTML, t: makeHumanReadable(realName)};
}
