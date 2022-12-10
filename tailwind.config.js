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
            },
            colors: {
                'background': '#161618',
                'foreground': '#19191B',
                'border': '#343439',
                'bodytext': '#706F77',
                'basicwhite': '#EDEDEF',
                'accent': '#B57FE9'

            }
        },

    },

    plugins: [require('@tailwindcss/forms')],
};
