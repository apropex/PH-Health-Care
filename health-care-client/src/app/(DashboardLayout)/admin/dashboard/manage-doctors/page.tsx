//

import RefreshButton from "@/components/buttons/RefreshButton";
import DoctorManagementHeader from "@/components/modules/Admin/doctorManagement/DoctorManagementHeader";

export default function ManageDoctorsPage() {
  return (
    <div className="space-y-5">
      <DoctorManagementHeader />
      <RefreshButton>Refresh</RefreshButton>
    </div>
  );
}
