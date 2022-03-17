/* eslint-disable */
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
    // mode: 'jit',
    darkMode: false,
    important: true,
    future: {
        removeDeprecatedGapUtilities: true,
    },
    purge: {
        mode: 'all',
        content: ['./src/**/*.html', './src/**/*.ts', './src/**/*.tsx', './src/**/*.js'],
    },
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                'fade-in': {
                    '0%': {
                        opacity: '0',
                    },
                    '100%': {
                        opacity: '1',
                    },
                },
                'typing-dots__indicator': {
                    '0%': {
                        'background-color': '#9ea2a8',
                    },
                    '100%': {
                        background: '#e4e7ea',
                    },
                },
            },
            animation: {
                'fade-in': 'fade-in 0.3s ease-out',
                'typing-dots__indicator': 'typing-dots__indicator 0.9s infinite alternate',
            },
        },
    },
    variants: {},
    plugins: [
        plugin(function ({ addUtilities, theme, config }) {
            const themeColors = theme('colors');
            const individualBorderColors = Object.keys(themeColors).map((colorName) => ({
                [`.border-b-${colorName}`]: {
                    borderBottomColor: themeColors[colorName],
                },
                [`.border-t-${colorName}`]: {
                    borderTopColor: themeColors[colorName],
                },
                [`.border-l-${colorName}`]: {
                    borderLeftColor: themeColors[colorName],
                },
                [`.border-r-${colorName}`]: {
                    borderRightColor: themeColors[colorName],
                },
            }));

            addUtilities(individualBorderColors);
        }),
        require('@tailwindcss/forms'),
    ],
};
