import RegisterForm from "@/components/modules/Auth/RegisterForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="p-10 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm bg-background">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-center">
            Create you account
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground/70 text-center">
            Enter you information to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
          <p className="mt-3 text-muted-foreground text-sm text-center">
            Already hve an account? Please{" "}
            <Link href={"/login"}>
              <Button type="button" variant={"link"} className="p-0">
                login
              </Button>
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
