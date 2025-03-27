# Icons

The icons are automatically imported by the `.vite/VitePluginIcons.ts` plugin.

The icon svg files are located in the `icons` directory.

Each icon is expected to have a "filled" and an "outline" variant in the respective
directories. The name-pattern of `filled` icons is: `icon-your-icon-name-filled.svg`,
the pattern for `outline` icons is: `icon-your-icon-name-outlined.svg`. The generated
icon name for both will be "yourIconName" (camelCase).

The `iconDefinition.ts` will be automatically generated containing the icon definitions,
so just place the svg files in the respective directories and the plugin will take care of the rest.
