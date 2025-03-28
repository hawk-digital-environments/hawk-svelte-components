import path from 'path';
import fs from 'fs';
import {sass as sassPreprocessor} from 'svelte-preprocess';
import temp from 'temp';

export function sassModuleImportProcessor(options) {
    temp.track();

    return {
        /**
         * @param args { content: string, filename: string }
         */
        script: async (args) => {
            const pattern = /(?<!\/\/\s*)import\s*(?:(.+)\s+from\s+)?['|"](.+?(module\.sass))['|"];?/gm;
            let {content} = args;
            if (content.search(pattern) === -1) {
                return null;
            }

            const dependencies = [];

            const matches = [...content.matchAll(pattern)];
            for (const match of matches) {
                const [fullMatch, , modulePath] = match;
                const sassFilePath = path.resolve(path.dirname(args.filename), modulePath);
                if (!fs.existsSync(sassFilePath)) {
                    throw new Error(`File not found: ${sassFilePath}`);
                }

                dependencies.push(sassFilePath);

                const p = sassPreprocessor(options);

                const t = await p.style({
                    content: fs.readFileSync(sassFilePath, 'utf-8'),
                    filename: sassFilePath,
                    attributes: {
                        lang: 'sass',
                        type: 'text/sass'
                    },
                    markup: ''
                }) || null;

                if (!t || !t.code) {
                    throw new Error(`Error compiling sass file: ${sassFilePath}`);
                }

                // Remove all comments
                let compiled = t.code.replace(/\/\/.*\n*/g, '')
                    .replace(/\/\*[\s\S\n]*?\*\/\n*/g, '')
                    .trim();

                const tempFile = temp.path({suffix: '.module.css'});
                fs.writeFileSync(tempFile, compiled);

                const cssImport = path.relative(path.dirname(args.filename), tempFile);

                content = content.replace(fullMatch, fullMatch.replace(modulePath, cssImport));
            }

            return {code: content, dependencies};
        }
    };
}
