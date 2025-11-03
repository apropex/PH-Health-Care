"use client";

import { PasswordInput } from "@/components/custom-ui/password-input";
import { Button } from "@/components/ui/button";
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
import { Gender } from "@/constants";
import { useEffect, useState } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { DoctorFormSchemaType } from "../modules/Doctors/manage-doctor/doctorForm.schema";

interface iProps {
  form: UseFormReturn<DoctorFormSchemaType>;
  onSubmit: SubmitHandler<DoctorFormSchemaType>;
}

export default function DoctorForm({ form, onSubmit }: iProps) {
  const [needPasswordChange, setNeedPasswordChange] = useState<boolean>(true);

  const needPasswordChangeValue = form.watch("needPasswordChange");

  useEffect(() => {
    setNeedPasswordChange(needPasswordChangeValue === "true");
  }, [needPasswordChangeValue]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto mt-8 border rounded-2xl"
      >
        <h2 className="text-2xl md:text-4xl font-bold text-center my-4">Doctor-Form</h2>

        <div className="border-t border-muted" />

        <div className="p-5">
          <h3 className="text-xl text-primary mb-3">Doctor Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8">
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
                    <Input placeholder="John@example.com" {...field} />
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

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={Gender.MALE}>Male</SelectItem>
                      <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="needPasswordChange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Need Password Change?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="md:col-span-3">
                  <FormLabel>Doctor Address</FormLabel>
                  <FormControl>
                    <Input placeholder="City, Town, Area..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="border-t border-muted" />

        <div className="p-5">
          <h3 className="text-xl text-primary mb-3">Doctor Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8">
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8">
              <FormField
                control={form.control}
                name="qualification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qualification</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter you doctor qualification" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Designation</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter you doctor designation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="registrationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration No.</FormLabel>
                  <FormControl>
                    <Input placeholder="FDS65FS5F-D45" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="appointmentFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Appointment Fee</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="750" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentWorkingPlace"
              render={({ field }) => (
                <FormItem className="md:col-span-3">
                  <FormLabel>Current Working Place</FormLabel>
                  <FormControl>
                    <Input placeholder="City, Town, Area..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <Button type="submit" className="w-full max-w-sm">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
