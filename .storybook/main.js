
/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
    stories: ['../src/**/*.stories.js'],
    addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
    framework: '@storybook/vue3-vite'
};

export default config;
