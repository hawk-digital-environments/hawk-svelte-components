import type {AddonEntrypoint} from '@/loadAddons.ts';

export const addon: AddonEntrypoint = async (context) => ({
    commands: async (program) => {
        program
            .command('build')
            .description('Builds the library into the "dist" folder')
            .action(async () => {
                await context.docker.executeCommandInService('app', ['npm', 'run', 'build'], {foreground: true});
            });
    },
    events: async (events) => {
        events.on('installer:envFile:filter', async ({envFile}) => {
            envFile.set('DOCKER_PROJECT_PORT', '443');
        });
    }
});
