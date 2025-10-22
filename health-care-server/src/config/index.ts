import dotenv from "dotenv";
import path from "path";
import { envChecker } from "../utils/envChecker";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const ENV = process.env;

interface iENV {
  node_env: string;
  port: number;
  client_url: string;
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
  open_router_api: string;
  stripe: {
    secret_key: string;
    webhook_secret: string;
    success_url: string;
    cancel_url: string;
  };
}

const _env = {
  node_env: ENV.NODE_ENV,
  port: Number(ENV.PORT),
  client_url: ENV.CLIENT_URL,
  database_url: ENV.DATABASE_URL,
  bcrypt_salt: Number(ENV.BCRYPT_SALT),
  jwt: {
    access_token_secret: ENV.ACCESS_TOKEN_SECRET,
    access_token_expire_time: ENV.ACCESS_TOKEN_EXPIRE_TIME,
    refresh_token_secret: ENV.REFRESH_TOKEN_SECRET,
    refresh_token_expire_time: ENV.REFRESH_TOKEN_EXPIRE_TIME,
  },
  cloudinary: {
    cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
    api_key: ENV.CLOUDINARY_API_KEY,
    api_secret: ENV.CLOUDINARY_API_SECRET,
  },
  open_router_api: ENV.OPEN_ROUTER_API_KEY,
  stripe: {
    secret_key: ENV.STRIPE_SECRET_KEY,
    webhook_secret: ENV.STRIPE_WEBHOOK_SECRET,
    success_url: ENV.STRIPE_SUCCESS_URL,
    cancel_url: ENV.STRIPE_CANCEL_URL,
  },
} as iENV;

envChecker(_env);

//

export const isDev = _env.node_env === "development";
export default _env;
