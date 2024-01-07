const path = require("path")

module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "https://lavoro-api.azure-api.net/api/:path*",
            },
        ]
    },
}
