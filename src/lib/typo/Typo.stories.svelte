<script module>
    import {defineMeta} from '@storybook/addon-svelte-csf';
    import Typo from './Typo.svelte';

    /**
     * This component allows you to handle all common typographical elements in your HTML.
     * It also provides some global classes to modify the text to your needs.
     */
    const {Story} = defineMeta({
        title: 'Handson/Typo',
        component: Typo,
        tags: ['autodocs'],
        argTypes: {},
        args: {}
    });
</script>


<Story name="Generic" args={{}} parameters={{controls: {disable: true}}}>
    <Typo>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        <hr>
        <p><a href="https://hawk-digital-environments.github.io/hawk-svelte-components/">A fancy link</a></p>
        <p>Lorem ipsum, dolor sitamet consectetur adipisicing elit. Provident omnis laudantium itaque quisquam est,
            magnam
            harum, cum molestias necessitatibus obcaecati quod esse debitis velit nemo dolores deserunt. Quia, iure
            doloremque.</p>
        <img src="https://picsum.photos/2500/800" alt="Random example">
        <ul>
            <li>list item - 1</li>
            <li>list item - 2</li>
            <li>list item - 3</li>
            <li>list item - 4</li>
        </ul>
        <ol>
            <li>list item - 1</li>
            <li>list item - 2</li>
            <li>list item - 3</li>
            <li>list item - 4</li>
        </ol>
        <blockquote>
            Life is like an npm install - you never know what you are going to get.
            <cite>- Forrest Gump</cite>
        </blockquote>
        <p>This is <code>Code</code> inside paragraph</p>
        <samp>This text is meant to be treated as sample output from a computer program.</samp>
        <pre><code>&lt;p&gt;Sample text here...&lt;/p&gt;
&lt;p&gt;And another line of sample text here...&lt;/p&gt;
</code></pre>
        <pre>&lt;script&gt;
    import &lbrace;Icon&rbrace; from '@hawk-hhg/svelte-components'
&lt;/script&gt;
&lt;Icon icon="eye" /&gt;</pre>
        <p>
            To switch directories, type <kbd>cd</kbd> followed by the name of the directory.<br>
            To edit settings, press <kbd><kbd>ctrl</kbd> + <kbd>,</kbd></kbd>
        </p>
        <table>
            <thead>
            <tr>
                <th>Element position</th>
                <th>Element name</th>
                <th>Symbol</th>
                <th>Atomic mass</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>6</td>
                <td>Carbon</td>
                <td>C</td>
                <td>12.011</td>
            </tr>
            <tr>
                <td>7</td>
                <td>Nitrogen</td>
                <td>N</td>
                <td>14.007</td>
            </tr>
            <tr>
                <td>39</td>
                <td>Yttrium</td>
                <td>Y</td>
                <td>88.906</td>
            </tr>
            <tr>
                <td>56</td>
                <td>Barium</td>
                <td>Ba</td>
                <td>137.33</td>
            </tr>
            <tr>
                <td>58</td>
                <td>Cerium</td>
                <td>Ce</td>
                <td>140.12</td>
            </tr>
            </tbody>
        </table>

        <h3>Text modifiers</h3>
        <p>Inside the typo provider you can use some global classes to modify the text to your needs.</p>
        <h4>Size Modifiers</h4>
        <ul>
            {#each ['xs', 's', 'm', 'l', 'xl', 'xxl'] as size}
                <li><code>.size-{size}</code> - <span class={'size-'+size}>Lorem ipsum dolor sit, ...</span></li>
            {/each}
        </ul>
        <h4>Weight Modifiers</h4>
        <ul>
            {#each ['light', 'regular', 'medium', 'semibold', 'bold'] as weight}
                <li><code>.weight-{weight}</code> - <span class={'weight-'+weight}>Lorem ipsum dolor sit, ...</span>
                </li>
            {/each}
        </ul>
        <h4>Decorations</h4>
        <ul>
            {#each ['underline', 'strike'] as decorator}
                <li><code>.{decorator}</code> - <span class={decorator}>Lorem ipsum dolor sit, ...</span></li>
            {/each}
        </ul>
    </Typo>
</Story>
