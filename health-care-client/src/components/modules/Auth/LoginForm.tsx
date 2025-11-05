"use client";

import LoadingButton from "@/components/buttons/LodingButton";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/password";
import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  return (
    <form>
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
            </Field>
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Link href={"/forgot-password"} className="text-xs">
                  Forgot your password?
                </Link>
              </div>
              <Password id="password" name="password" placeholder="••••••••" required />
            </Field>
          </FieldGroup>
        </FieldSet>

        <Field orientation="vertical">
          <LoadingButton
            isLoading={loading}
            disabled={loading}
            loadingText="Logging in..."
          >
            Login
          </LoadingButton>
        </Field>
      </FieldGroup>
    </form>
  );
}
