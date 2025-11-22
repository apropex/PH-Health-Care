"use client";

import LoadingButton from "@/components/buttons/LoadingButton";
import { PasswordInput } from "@/components/custom-ui/password-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateAdminSchemaType } from "@/zod/admin-validation";
import { useState } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

interface iProps {
  form: UseFormReturn<CreateAdminSchemaType>;
  onSubmit: SubmitHandler<CreateAdminSchemaType>;
  loading: boolean;
  isEdit?: boolean;
}

export default function AdminForm({ form, onSubmit, loading, isEdit }: iProps) {
  const [needPasswordChange, setNeedPasswordChange] = useState<boolean>(true);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8 p-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="John@example.com" {...field} readOnly={isEdit} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="01500000000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className={`${isEdit && "hidden"}`}>
            <FormField
              control={form.control}
              name="needPasswordChange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Need Password Change?</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      setNeedPasswordChange(value === "true");
                      field.onChange(value);
                    }}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select action" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">TRUE</SelectItem>
                      <SelectItem value="false">FALSE</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className={`${isEdit && "hidden"}`}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Placeholder"
                      {...field}
                      disabled={needPasswordChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-center mb-4 mt-8">
          <LoadingButton
            isLoading={loading}
            loadingText={isEdit ? "Updating..." : "Creating..."}
            type="submit"
            className="w-full max-w-sm"
            disabled={loading}
          >
            {isEdit ? "Update" : "Create"} Admin
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
