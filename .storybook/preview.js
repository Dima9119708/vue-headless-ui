import '../src/demos/popper/playground.css';

/** @type { import('@storybook/vue3-vite').Preview } */
const preview = {
    parameters: {
        layout: 'fullscreen',
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        }
    }
};

export default preview;
