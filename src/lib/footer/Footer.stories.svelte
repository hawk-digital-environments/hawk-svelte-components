<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import {Footer} from '$lib';

    /**
     * The footer component is used to display information at the bottom of a page, such as copyright information, links to legal documents, or contact information.
     * It is typically used in conjunction with a header and main content area to create a complete page layout.
     */
    const {Story} = defineMeta({
        title: 'Handson/Footer',
        component: Footer,
        tags: ['autodocs'],
        argTypes: {},
        args: {}
    });
</script>

<Story name="Generic" args={{}}>
    <ol>
        <li><a href="#noop1">Imprint</a></li>
        <li><a href="#noop2">Privacy Policy</a></li>
        <li><a href="#noop3">Contact</a></li>
    </ol>
</Story>

<Story name="In Context">
    {#snippet template(args)}
        <div style="display: flex; flex-direction: column; min-height: 100vh; border: 1px solid #ccc; position: absolute; top: 0; left: 0; right: 0; bottom: 0;">
            <header style="background-color: #f0f0f0; padding: 1rem">
                <h1>Page Header</h1>
            </header>
            <main style="flex: 1; padding: 1rem; height: 100%;">
                <p>This is the main content of the page. It can contain text, images, or any other elements.</p>
            </main>
            <Footer {...args}>
                <ol>
                    <li><a href="#noop1">Imprint</a></li>
                    <li><a href="#noop2">Privacy Policy</a></li>
                    <li><a href="#noop3">Contact</a></li>
                </ol>
            </Footer>
        </div>
    {/snippet}
</Story>

<Story name="Many Entries" args={{
            headline: '©HAWK Hochschule für angewandte Wissenschaften',
            subHeadline: 'Alle Rechte vorbehalten'
        }}>
    <ol>
        <li><a href="#noop1">Imprint</a></li>
        <li><a href="#noop2">Privacy Policy</a></li>
        <li><a href="#noop3">Contact</a></li>
        <li><a href="#noop4">Terms of Service</a></li>
        <li><a href="#noop5">Cookie Policy</a></li>
        <li><a href="#noop6">Accessibility Statement</a></li>
        <li><a href="#noop7">Sitemap</a></li>
        <li><a href="#noop8">FAQ</a></li>
        <li><a href="#noop9">Support</a></li>
        <li><a href="#noop10">Feedback</a></li>
        <li><a href="#noop11">Careers</a></li>
        <li><a href="#noop12">Press</a></li>
        <li><a href="#noop13">Blog</a></li>
    </ol>
</Story>
