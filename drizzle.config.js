/** @type { import ("drizzle-kit").Config} */

export default {
  schema: "./configs/schema.js",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://accounts:npg_Ru0YdMZP3ATX@ep-dry-wave-a45nhtcp-pooler.us-east-1.aws.neon.tech/ai-short-video-generator?sslmode=require'
  },
};