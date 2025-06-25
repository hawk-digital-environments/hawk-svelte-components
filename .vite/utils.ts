import fs from 'node:fs';
import {optimize} from 'svgo';

export function makeHumanReadable(name: string): string {
    return name
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (s) => s.toUpperCase());
}

export function getGeneratedWarning(): string {
    return `// THIS FILE IS GENERATED. DO NOT MODIFY IT! To refresh, restart the dev server.`;
}

export function loadOptimizedSvg(path: string): string {
    const rawContent = fs.readFileSync(path, 'utf-8');
    const result = optimize(rawContent, {
        path: path, // recommended
        multipass: true // all other config fields are available here
    }).data;

    // Ensure that all single quotes are escaped
    return result.replace(/'/g, '\\\'').replace(/\n/g, '');
}
