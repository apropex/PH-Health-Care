import CustomButton from "@/components/buttons/CustomButton";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDoctorById } from "@/services/admin/doctorManagement";
import formatDate from "@/utility/formatDate";
import join from "@/utility/joinText";
import { EditIcon, Mail, MapPin, Phone, Star, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DoctorViewProps {
  searchParams?: Promise<{ id?: string }>;
}

export default async function DoctorView({ searchParams }: DoctorViewProps) {
  const id = (await searchParams)?.id;
  const doctor = (await getDoctorById(id!)).data;
  if (!doctor) return <div>Not doctor found</div>;

  const specialties = doctor.doctorSpecialties.map((d) => d.specialties);

  return (
    <Card className="border-none bg-background">
      <CardHeader className="pb-0">
        <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Admin • Doctor Details
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="rounded-md p-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
            <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-1 ring-gray-300 dark:ring-slate-700">
                <Image
                  src={doctor.profilePhoto}
                  alt={doctor.name}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
              <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100">
                {doctor.name}
              </h2>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="w-4 h-4 text-amber-500" />
                {doctor.averageRating || 0}
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="rounded-md p-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Contact
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" /> {doctor.contactNumber}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground truncate">
              <Mail className="w-4 h-4" /> {doctor.email}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" /> {doctor.address}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="rounded-md p-4 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div className="space-y-1">
                <span className="text-xs">Designation</span>
                <div className="font-medium text-slate-900 dark:text-slate-100">
                  {doctor.designation}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs">Qualification</span>
                <div className="font-medium text-slate-900 dark:text-slate-100">
                  {doctor.qualification}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs">Experience</span>
                <div className="font-medium text-slate-900 dark:text-slate-100">
                  {doctor.experience} years
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs">Appointment Fee</span>
                <div className="font-medium text-slate-900 dark:text-slate-100">
                  ${doctor.appointmentFee}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs">Registration Number</span>
                <div className="font-medium text-slate-900 dark:text-slate-100">
                  {doctor.registrationNumber}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs">Gender</span>
                <div className="font-medium text-slate-900 dark:text-slate-100">
                  {doctor.gender}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs">Created At</span>
                <div className="font-medium text-slate-900 dark:text-slate-100">
                  {formatDate(doctor.createdAt)}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs">Updated At</span>
                <div className="font-medium text-slate-900 dark:text-slate-100">
                  {formatDate(doctor.updatedAt)}
                </div>
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="rounded-md p-4 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Specialties
            </h3>
            <div className="flex flex-wrap gap-2">
              {specialties.length ? (
                specialties.map((s) => (
                  <Badge
                    key={s.id}
                    className="px-3 py-2 flex items-center gap-2 capitalize"
                  >
                    <Image
                      src={s.icon}
                      alt={s.title}
                      width={16}
                      height={16}
                      className="w-4 h-4 rounded-sm"
                    />
                    {s.title}
                  </Badge>
                ))
              ) : (
                <div className="text-sm text-muted-foreground">No specialties found.</div>
              )}
            </div>
          </div>

          {/* Admin Actions */}
          <div className="flex gap-3">
            <Link href={`/admin/dashboard/manage-doctors/update-doctor?id=${id}`}>
              <CustomButton icon={EditIcon}>Edit Doctor</CustomButton>
            </Link>
            <DeleteConfirmationDialog api={join("/doctor/soft-delete/", id || "")}>
              <CustomButton icon={Trash2Icon} variant="outline">
                Delete
              </CustomButton>
            </DeleteConfirmationDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
