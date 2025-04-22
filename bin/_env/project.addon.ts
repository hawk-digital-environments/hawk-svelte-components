import type {AddonEntrypoint} from '@/loadAddons.ts';

export const addon: AddonEntrypoint = async (context) => ({
    commands: async (program) => {
        program
            .command('build')
            .description('Builds the library into the "dist" folder')
            .action(async () => {
                await context.docker.executeCommandInService('app', ['npm', 'run', 'build'], {foreground: true});
            });

        program
            .command('build:push')
            .description('Builds the library into the "dist" folder and pushes it to npm')
            .argument('<token>', 'the npm token to use')
            .action(async (token) => {
                await context.docker.executeCommandInService('app', ['npm', 'run', 'build'], {foreground: true});
                await context.docker.executeCommandInService('app',
                    ['bash', '-c', `NODE_AUTH_TOKEN=${token} npm config set //registry.npmjs.org/:_authToken=${token} && npm publish --access public`],
                    {foreground: true});
            });
    },
    events: async (events) => {
        events.on('installer:envFile:filter', async ({envFile}) => {
            envFile.set('DOCKER_PROJECT_PORT', '443');
        });
    }
});
