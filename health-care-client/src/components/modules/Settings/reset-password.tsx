"use client";

import LoadingButton from "@/components/buttons/LoadingButton";
import { Label } from "@/components/ui/label";
import Password from "@/components/ui/password";
import { resetPassword } from "@/services/auth/auth.password";
import { extractJSONError } from "@/utility/extractJSONError";
import { passwordRegex } from "@/zod/patient-validation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function ResetPasswordForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!oldPassword.trim()) {
      setError("Old password is required");
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      setError(
        "Password must contain at least 1 letter, 1 number, 1 symbol and be 6+ characters",
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Password did not match");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const result = await resetPassword({ oldPassword, newPassword });

      if (result.success) {
        toast.success(result.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else setError(result.message);
    } catch (error) {
      const err = extractJSONError(error);
      setError(err?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex-1 space-y-5" onSubmit={handleSubmit}>
      {error && (
        <span className="inline-block text-sm text-destructive bg-destructive/8 py-1 px-2 rounded-xs">
          {error}
        </span>
      )}

      <div>
        <Label>
          Old Password
          <span className="text-sm text-destructive">*</span>
        </Label>
        <Password
          className="rounded-xs"
          value={oldPassword}
          onChange={({ target }) => setOldPassword(target.value)}
        />
      </div>
      <div>
        <Label>
          New Password
          <span className="text-sm text-destructive">*</span>
        </Label>
        <Password
          className="rounded-xs"
          value={newPassword}
          onChange={({ target }) => setNewPassword(target.value)}
        />
      </div>
      <div>
        <Label>
          Confirm Password
          <span className="text-sm text-destructive">*</span>
        </Label>
        <Password
          className="rounded-xs"
          value={confirmPassword}
          onChange={({ target }) => setConfirmPassword(target.value)}
        />
      </div>

      <LoadingButton
        isLoading={loading}
        loadingText="Submitting..."
        variant="outline"
        className="rounded-xs w-full mt-auto"
      >
        Submit
      </LoadingButton>
    </form>
  );
}
