"use client";

import LoadingButton from "@/components/buttons/LoadingButton";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/password";
import { login } from "@/services/auth/login";
import { getZodError } from "@/utility/zodValidatorFn";
import Link from "next/link";
import { useActionState } from "react";

export default function LoginForm() {
  const [state, action, isPending] = useActionState(login, null);

  return (
    <form action={action}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="rabbit@example.com"
                required
              />

              {getZodError(state, "email") && (
                <FieldDescription className="text-destructive">
                  {getZodError(state, "email")}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Link href={"/forgot-password"} className="text-xs">
                  Forgot your password?
                </Link>
              </div>
              <Password id="password" name="password" placeholder="••••••••" required />

              {getZodError(state, "password") && (
                <FieldDescription className="text-destructive">
                  {getZodError(state, "password")}
                </FieldDescription>
              )}
            </Field>
          </FieldGroup>
        </FieldSet>

        <Field orientation="vertical">
          <LoadingButton
            isLoading={isPending}
            disabled={isPending}
            loadingText="Logging in..."
          >
            Login
          </LoadingButton>
        </Field>
      </FieldGroup>
    </form>
  );
}
