/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,tsx}'],
	theme: {
		extend: {
			animation: {
				shine: 'shine 1s',
			},
			keyframes: {
				shine: {
					'100%': { left: '125%' },
				},
			},
		},
	},
	plugins: [],
};
