/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@mui/x-charts"],
  env: {
    NEXT_PUBLIC_SUPABASE_URL: "https://bvfycdzxotyzzqtjjogv.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
        .eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2ZnljZHp4b3R5enpxdGpqb2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY5NzE4NDYsImV4cCI6MjAzMjU0Nzg0Nn0
        .lug3jeeZyoH5IPWJM2ZzE3Tec3sjYd84V - OeiszWKSk,

    MONGODB_URI:
      "mongodb+srv://desmond:m1WMi2hhXnJCORr2@cluster0.22fyenu.mongodb.net/systracker",
    NEXTAUTH_SECRET: asdjadfklafjladfjalfj,
    NEXTAUTH_URL: "http://localhost:3000",
  },
}

export default nextConfig
