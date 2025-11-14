import RegisterForm from "@/components/modules/Auth/RegisterForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import join from "@/utility/joinText";
import { Home } from "lucide-react";
import Link from "next/link";

interface iProps {
  searchParams?: Promise<{ redirect?: string }>;
}

export default async function RegisterPage({ searchParams }: iProps) {
  const redirect = (await searchParams)?.redirect;

  return (
    <div className="p-10 flex flex-col justify-center items-center min-h-screen">
      <h3 className="text-lg md:text-2xl font-black text-primary mb-4 uppercase">
        PH Health Care
      </h3>
      <Card className="w-full max-w-lg bg-background">
        <CardHeader className="text-center">
          <CardTitle className="text-lg font-semibold">Create you account</CardTitle>
          <CardDescription className="text-sm text-muted-foreground/70">
            Enter you information to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm redirect={redirect} />
          <p className="my-3 text-muted-foreground text-sm text-center">
            Already hve an account? Please{" "}
            <Link href={join("/login", redirect ? `?redirect=${redirect}` : "")}>
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
