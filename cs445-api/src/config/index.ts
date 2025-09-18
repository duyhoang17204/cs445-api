import path from "path";
const defaults = {
  ROOT: path.join(__dirname, ".."),
  PATH_MODELS: path.join(__dirname, "../modules"),
  ADMIN_PATH: "/admin",
  DATABASE: {
    DATABASE_URL:
      process.env.DATABASE_URL || "mongodb://localhost:27017/staging",
    DATABASE_NAME: process.env.DATABASE_NAME || "staging",
  },
  TABLE_PREFIX: process.env.TABLE_PREFIX || "dev",
  STOCK_DEFAULT: process.env.STOCK_DEFAULT || "vndb",
};

const config = {
  ...defaults,
};

export default config;
