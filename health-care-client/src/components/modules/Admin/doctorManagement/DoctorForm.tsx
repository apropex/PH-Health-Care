"use client";

import LoadingButton from "@/components/buttons/LoadingButton";
import { PasswordInput } from "@/components/custom-ui/password-input";
import CustomMultiSelect from "@/components/CustomMultiSelect";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Gender } from "@/constants";
import { iSpecialty } from "@/interfaces/doctor.interfaces";
import { cn } from "@/lib/utils";
import { DoctorFormSchemaType_client } from "@/zod/doctor-validation";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

interface iProps {
  form: UseFormReturn<DoctorFormSchemaType_client>;
  onSubmit: SubmitHandler<DoctorFormSchemaType_client>;
  loading: boolean;
  isEdit?: boolean;
  setSpecialtiesIds: Dispatch<SetStateAction<string[]>>;
  specialties: iSpecialty[];
}

export default function DoctorForm({
  form,
  onSubmit,
  loading,
  isEdit,
  setSpecialtiesIds,
  specialties,
}: iProps) {
  const [needPasswordChange, setNeedPasswordChange] = useState<boolean>(true);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem
                  className={cn("md:col-span-3", {
                    "md:col-span-2": isEdit,
                  })}
                >
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

          <Label className="mt-8 text-base">Specialties</Label>
          <CustomMultiSelect
            setSelectedItems={setSpecialtiesIds}
            defaultItems={specialties}
            isEdit={isEdit}
          />
        </div>

        <div className="flex justify-center mb-4 mt-8">
          <LoadingButton
            isLoading={loading}
            loadingText={isEdit ? "Updating..." : "Creating..."}
            type="submit"
            className="w-full max-w-sm"
            disabled={loading}
          >
            {isEdit ? "Update" : "Create"} Doctor
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
