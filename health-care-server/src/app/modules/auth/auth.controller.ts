import { setCookie } from "../../../utils/cookie";
import catchAsync from "../../shared/catchAsync";
import _response from "../../shared/sendResponse";
import services from "./auth.service";

const login = catchAsync(async (req, res) => {
  const { user, access_token, refresh_token } = await services.login(req.body);
  setCookie.allTokens(res, access_token, refresh_token);
  _response(res, { message: "User logged in successfully", data: user });
});

export default { login };
