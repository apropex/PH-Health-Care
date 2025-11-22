import { _fetch } from "@/utility/_fetch";

interface iResetPassword {
  oldPassword: string;
  newPassword: string;
}

export const resetPassword = async (payload: iResetPassword) => {
  return await _fetch.post("/auth/reset-password", {}, payload);
};
