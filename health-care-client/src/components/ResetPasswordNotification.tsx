import { getUser } from "@/helper/getUser";
import { cn } from "@/lib/utils";
import Link from "next/link";
import CustomButton from "./buttons/CustomButton";

export default async function ResetPasswordNotification({
  className,
}: {
  className?: string;
}) {
  const user = await getUser();

  return (
    <>
      {user && user.id && user.needPasswordChange ? (
        <div className="bg-destructive/10">
          <div
            className={cn(
              "px-6 mx-auto flex items-center justify-between gap-4 flex-wrap py-3",
              className
            )}
          >
            <p className="text-destructive text-lg font-medium">
              You should change your password!
            </p>
            <Link href={"/settings/password"}>
              <CustomButton textClass="mt-0.5">Reset Password</CustomButton>
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
