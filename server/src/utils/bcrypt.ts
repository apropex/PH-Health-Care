import _env from "@/config";
import { compare, genSalt, hash } from "bcryptjs";

//

export async function buildHash(password: string): Promise<string> {
  const salt = await genSalt(_env.bcrypt_salt);
  return await hash(password, salt);
}

export async function compareHash(
  password: string,
  hash: string,
): Promise<boolean> {
  return await compare(password, hash);
}
