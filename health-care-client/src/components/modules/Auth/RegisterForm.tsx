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
import { cn } from "@/lib/utils";
import { registerPatient } from "@/services/auth/registerPatient";
import { getZodError } from "@/utility/zodValidatorFn";
import { Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function RegisterForm({ redirect }: { redirect?: string }) {
  const [state, formAction, isPending] = useActionState(registerPatient, null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (() => {
      setAvatarError(null);
      if (state && !state.success && state.message) {
        if (!avatar) setAvatarError("Profile picture is required");
        toast.error(state.message);
      }
    })();
  }, [state, avatar]);

  return (
    <form action={formAction}>
      {redirect && <input type="hidden" name="redirect" value={redirect} />}

      <div className="flex flex-col items-center justify-center gap-2 mb-8">
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              if (fileInputRef.current) fileInputRef.current.value = "";
              setAvatar(null);
            }}
            className="absolute top-3 -right-12 bg-destructive text-white rounded-xs p-px pointer-events-auto"
          >
            <X size={16} />
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          name="avatar"
          className="hidden"
          id="avatar-input"
          onChange={(e) => setAvatar(e.target.files?.[0] ?? null)}
        />
        <label
          htmlFor="avatar-input"
          className={cn("cursor-pointer", {
            "cursor-default pointer-events-none": !!avatar,
          })}
        >
          <div className="size-20 rounded-full flex items-center justify-center border ">
            {avatar ? (
              <Image
                src={URL.createObjectURL(avatar)}
                alt="Profile Image"
                width={80}
                height={80}
                className="size-20 object-cover rounded-full"
              />
            ) : (
              <ImageIcon />
            )}
          </div>
        </label>

        <p className="text-sm text-muted-foreground">Add Profile Picture</p>
        {avatarError && <p className="text-xs text-destructive">{avatarError}</p>}
      </div>

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
