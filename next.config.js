/** @type {import('next').NextConfig} */

const authenticatedRoutes = ["/", "/members:any"]

const authenticatedRedirects = authenticatedRoutes.map((source) => ({
  source,
  missing: [
    {
      type: 'cookie',
      key: 'access_token',
    },
  ],
  destination: `/login${source !== "/" ? `?redirect=${source}` : ""}`,
  permanent: false,
}));

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      ...authenticatedRedirects,
      {
        source: "/login" || "/signup",
        has: [
          {
            type: "cookie",
            key: "access_token",
          },
        ],
        permanent: false,
        destination: "/"
      }
    ]
  }
}

module.exports = nextConfig
