import RegisterForm from "@/components/modules/Auth/RegisterForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="p-10 flex flex-col justify-center items-center min-h-screen">
      <h3 className="text-lg md:text-2xl font-black text-primary mb-4 uppercase">
        PH Health Care
      </h3>
      <Card className="w-full max-w-sm bg-background">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Create you account</CardTitle>
          <CardDescription className="text-sm text-muted-foreground/70">
            Enter you information to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
          <p className="my-3 text-muted-foreground text-sm text-center">
            Already hve an account? Please{" "}
            <Link href={"/login"}>
              <Button type="button" variant={"link"} className="p-0">
                login
              </Button>
            </Link>
          </p>
          <div className="flex justify-center items-center">
            <Link href={"/"} className="flex items-center gap-x-1 text-primary text-sm">
              <Home size={16} /> <span className="inline-block mt-1">Back To Home</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
