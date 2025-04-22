import path from 'path';
import fs from 'fs';
import {postcss, sass as sassPreprocessor} from 'svelte-preprocess';
import postcssmodules from 'postcss-modules';

export function sassModuleImportProcessor(options) {
    return {
        markup: async ({content, filename}) => {
            const scriptRegex = /<!--[^]*?-->|<script(\s[^]*?)?>([^]*?)<\/script>/gi;
            const importRegex = /(?<!\/\/\s*)import\s*(?:(.+)\s+from\s+)?['|"](.+?(module\.sass))['|"];?/gm;
            const dependencies = new Set();
            const styles = [];

            let code = await replace_async(content, scriptRegex, async (scriptBlock) => {
                return await replace_async(scriptBlock, importRegex, async (fullMatch, importName, modulePath) => {
                    const sassFilePath = path.resolve(path.dirname(filename), modulePath);
                    if (!fs.existsSync(sassFilePath)) {
                        throw new Error(`File not found: ${sassFilePath}`);
                    }

                    const sassResult = await sassPreprocessor(options).style({
                        content: fs.readFileSync(sassFilePath, 'utf-8'),
                        filename: sassFilePath,
                        attributes: {
                            lang: 'sass',
                            type: 'text/sass'
                        },
                        markup: ''
                    }) || null;

                    if (!sassResult || !sassResult.code) {
                        throw new Error(`Error compiling sass file: ${sassFilePath}`);
                    }

                    // Remove all comments
                    let compiled = sassResult.code.replace(/\/\/.*\n*/g, '')
                        .replace(/\/\*[\s\S\n]*?\*\/\n*/g, '')
                        .trim();

                    // Resolve the CSS modules
                    let extractedClassMap = {};
                    styles
                        .push(
                            (await postcss({
                                map: false,
                                plugins: [
                                    postcssmodules({
                                        getJSON(cssFilename, json, outputFilename) {
                                            extractedClassMap = json;
                                        }
                                    })
                                ]
                            }).style({
                                content: compiled,
                                filename: sassFilePath.replace(/\.sass$/, '.css'),
                                attributes: {},
                                markup: ''
                            })).code.replace(/^\/\*# sourceMappingURL.*$/gm, '').trim()
                        );

                    // Replace the original import with the extracted JSON as oneliner
                    const replacedImport = `const ${importName} = ${JSON.stringify(extractedClassMap)};`;

                    dependencies.add(sassFilePath);

                    return fullMatch.replace(fullMatch, replacedImport);
                });
            });

            // Nothing replaced, nothing to do.
            if (styles.length === 0) {
                return null;
            }

            code += `<style>
:global {
    ${styles.join('\n')}
}
</style>
`;
            return {code, dependencies: Array.from(dependencies)};
        }
    };
}

/**
 * https://github.com/sveltejs/svelte/blob/8fc85f0ef6b53ed85e54c129d79270fe577626dc/src/compiler/preprocess/index.ts#L43
 * @param str
 * @param re
 * @param func
 * @returns {Promise<string>}
 */
async function replace_async(str, re, func) {
    const replacements = [];
    str.replace(re, (...args) => {
        replacements.push(
            func(...args).then(
                res =>
                    ({
                        offset: args[args.length - 2],
                        length: args[0].length,
                        replacement: res
                    })
            )
        );
        return '';
    });
    let out = '';
    let last_end = 0;
    for (const {offset, length, replacement} of await Promise.all(
        replacements
    )) {
        out += str.slice(last_end, offset) + replacement;
        last_end = offset + length;
    }
    out += str.slice(last_end);
    return out;
}
