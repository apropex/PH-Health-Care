//

import ResetPasswordForm from "@/components/modules/Settings/reset-password";

export default function SettingsPasswordPage() {
  return (
    <div className="">
      {/* RESET PASSWORD */}
      <div className="w-full border rounded-sm px-4 py-6 flex justify-between flex-wrap flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h3 className="text-xl">Reset your password</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Keep your account safe by regularly updating your password. To proceed, first
            enter your current password to verify your identity. Then create a new, strong
            password that&apos;s at least 8 characters long and includes a combination of
            uppercase and lowercase letters, numbers, and special symbols. Finally,
            re-type the new password in the confirmation field to ensure accuracy. Once
            submitted, you&apos;ll be logged out automatically and will need to sign in
            again with your new credentials.
          </p>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
