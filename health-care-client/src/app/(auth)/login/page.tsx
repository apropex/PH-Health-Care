import LoginForm from "@/components/modules/Auth/LoginForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="p-10 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm bg-background">
        <CardHeader>
          <CardTitle className="text-lg md:text-3xl font-semibold text-center">
            Welcome Back!
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground/70 text-center">
            Enter you information to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <p className="mt-3 text-muted-foreground text-sm text-center">
            Don&apos;t hve an account? Please{" "}
            <Link href={"/register"}>
              <Button type="button" variant={"link"} className="p-0">
                register
              </Button>
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
