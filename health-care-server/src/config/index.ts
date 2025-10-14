import dotenv from "dotenv";
import path from "path";
import { envChecker } from "../utils/envChecker";

dotenv.config({ path: path.join(process.cwd(), ".env") });

interface iENV {
  node_env: string;
  port: number;
  database_url: string;
  bcrypt_salt: number;
  jwt: {
    access_token_secret: string;
    access_token_expire_time: string;
    refresh_token_secret: string;
    refresh_token_expire_time: string;
  };
  cloudinary: {
    cloud_name: string;
    api_key: string;
    api_secret: string;
  };
}

const _env = {
  node_env: process.env.NODE_ENV,
  port: Number(process.env.PORT),
  database_url: process.env.DATABASE_URL,
  bcrypt_salt: Number(process.env.BCRYPT_SALT),
  jwt: {
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    access_token_expire_time: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    refresh_token_expire_time: process.env.REFRESH_TOKEN_EXPIRE_TIME,
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
} as iENV;

envChecker(_env);

//

export const isDev = _env.node_env === "development";
export default _env;
