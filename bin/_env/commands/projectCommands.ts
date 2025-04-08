import type {CommandEntrypoint} from '/types.ts';

const commands: CommandEntrypoint = async (program, context) => {
    program
        .command('build')
        .description('Builds the library into the "dist" folder')
        .action(async () => {
            await context.docker.executeCommandInService('app', ['npm', 'run', 'build'], undefined, true);
        });

    // When installing, ensure that we are running the correct port on the host machine
    context.getEvents().on('installer:envFile:filter', async ({envFile}) => {
        envFile.set('DOCKER_PROJECT_PORT', '443');
    });
};

export default commands;
