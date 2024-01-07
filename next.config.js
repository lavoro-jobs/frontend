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
                destination: process.env.API_URL
                    ? process.env.API_URL + "/api/:path*"
                    : "http://localhost:8000/api/:path*",
            },
        ]
    },
}
