"use client";

import LoadingButton from "@/components/buttons/LoadingButton";
import ErrorFormDescription from "@/components/shared/ErrorFormDescription";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/password";
import { login } from "@/services/auth/login";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function LoginForm({ redirect }: { redirect?: string }) {
  const [state, action, isPending] = useActionState(login, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={action}>
      {redirect && <input type="hidden" name="redirect" value={redirect} />}

      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={"admin@gmail.com"}
                placeholder="rabbit@example.com"
                required
              />
              <ErrorFormDescription state={state} fieldName="email" />
            </Field>

            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Link href={"/forgot-password"} className="text-xs">
                  Forgot your password?
                </Link>
              </div>
              <Password
                id="password"
                name="password"
                defaultValue={"Z/x32165"}
                required
              />
              <ErrorFormDescription state={state} fieldName="password" />
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
