import { iUser } from "@/interfaces/user.interfaces";
import { JwtPayload } from "jsonwebtoken";

export default function getUserInfo(user: iUser | JwtPayload | null) {
  let avatar: string = (user as JwtPayload)?.avatar || "/avatar.png";
  let name: string = (user as JwtPayload)?.name || "Unknown User";
  let email: string = "No Email Provided";

  if (user) {
    email = user.email;

    if (user.admin) {
      avatar = user.admin.profilePhoto || avatar;
      name = user.admin.name;
    }
    if (user.doctor) {
      avatar = user.doctor.profilePhoto || avatar;
      name = user.doctor.name;
    }
    if (user.patient) {
      avatar = user.patient.profilePhoto || avatar;
      name = user.patient.name;
    }
  }

  return { avatar, name, email };
}
