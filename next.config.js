/** @type {import('next').NextConfig} */
const nextConfig = {
	sassOptions: {
		prependData: `@import "@/assets/styles/variables/index.scss";`,
	},
}

module.exports = nextConfig
