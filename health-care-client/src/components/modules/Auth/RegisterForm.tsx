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
import { registerPatient } from "@/services/auth/registerPatient";
import { getZodError } from "@/utility/zodValidatorFn";
import { useActionState } from "react";

export default function RegisterForm({ redirect }: { redirect?: string }) {
  const [state, formAction, isPending] = useActionState(registerPatient, null);

  return (
    <form action={formAction}>
      {redirect && <input type="hidden" name="redirect" value={redirect} />}

      <FieldGroup>
        <FieldSet>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Evil Rabbit"
                required
              />
              {getZodError(state, "name") && (
                <FieldDescription className="text-destructive">
                  {getZodError(state, "name")}
                </FieldDescription>
              )}
            </Field>
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
            <Field className="md:col-span-2">
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input
                id="address"
                name="address"
                type="text"
                placeholder="City, Town, Area..."
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Password id="password" name="password" required />
              {getZodError(state, "password") && (
                <FieldDescription className="text-destructive">
                  {getZodError(state, "password")}
                </FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
              <Password id="confirmPassword" name="confirmPassword" required />
              {getZodError(state, "confirmPassword") && (
                <FieldDescription className="text-destructive">
                  {getZodError(state, "confirmPassword")}
                </FieldDescription>
              )}
            </Field>
          </FieldGroup>
        </FieldSet>

        {/* <FieldSeparator /> */}
        <Field orientation="vertical">
          <LoadingButton
            isLoading={isPending}
            disabled={isPending}
            loadingText="Creating..."
          >
            Create Account
          </LoadingButton>
        </Field>
      </FieldGroup>
    </form>
  );
}
