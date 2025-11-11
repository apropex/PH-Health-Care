import SettingsNavbar from "@/components/modules/Settings/settings-navbar";
import { iChildren } from "@/interfaces";

export default function SettingsLayout({ children }: Readonly<iChildren>) {
  return (
    <div className="space-y-4">
      <div className="border-b border-foreground/10 pb-2">
        <h3 className="text-xl md:text-3xl font-semibold">Settings</h3>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <SettingsNavbar />

      <div>{children}</div>
    </div>
  );
}
