import cloudinary from "cloudinary";
import _env from "..";

const { v2 } = cloudinary;

v2.config({
  cloud_name: _env.cloudinary.cloud_name,
  api_key: _env.cloudinary.api_key,
  api_secret: _env.cloudinary.api_secret,
  secure: true,
});

export default v2;
