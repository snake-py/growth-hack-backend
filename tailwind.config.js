const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
                mono: ['IBM Plex Mono', ...defaultTheme.fontFamily.mono],
            },
            colors: {
                'background': '#161618',
                'foreground': '#19191B',
                'border': '#343439',
                'bodytext': '#706F77',
                'basicwhite': '#EDEDEF',
                'accent': '#B57FE9'

            },
            backgroundImage: {
                'gradientoverlay': 'linear-gradient(180deg, rgba(25, 25, 27, 0) 0%, #19191B 59%, #19191B 61.46%, rgba(25, 25, 27, 0) 100%);'
            }
        },

    },

    plugins: [require('@tailwindcss/forms')],
};
