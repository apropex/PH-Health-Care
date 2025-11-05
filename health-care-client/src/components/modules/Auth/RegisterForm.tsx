"use client";

import LoadingButton from "@/components/buttons/LodingButton";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/password";
import { useState } from "react";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  return (
    <form>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Evil Rabbit"
                required
              />
            </Field>
            <Field>
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
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Password id="password" name="password" placeholder="********" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
              <Password
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                required
              />
            </Field>
          </FieldGroup>
        </FieldSet>

        {/* <FieldSeparator /> */}
        <Field orientation="vertical">
          <LoadingButton isLoading={loading} disabled={loading} loadingText="Creating...">
            Create Account
          </LoadingButton>
        </Field>
      </FieldGroup>
    </form>
  );
}
