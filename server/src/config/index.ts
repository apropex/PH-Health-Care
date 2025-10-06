import dotenv from "dotenv";
import path from "path";
import { envChecker } from "../utils/envChecker";

dotenv.config({ path: path.join(process.cwd(), ".env") });

interface iENV {
  node_env: string;
  port: number;
  database_url: string;
}

const _env = {
  node_env: process.env.NODE_ENV,
  port: Number(process.env.PORT),
  database_url: process.env.DATABASE_URL,
} as iENV;

envChecker(_env);

export default _env;
