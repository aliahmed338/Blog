"use client";

import { DOMAIN } from "@/app/utils/constant";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import authImage from "../../../public/auth.jpg";
import { cn } from "@/lib/utils";

const LoginForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (data.email === "") return toast.error("Email is Required");
    if (data.password === "") return toast.error("Password is Required");

    try {
      setLoading(true);

      await axios.post(`${DOMAIN}/api/users/login`, {
        email: data.email,
        password: data.password,
      });
      router.replace("/");
      setLoading(false);
      router.refresh();
    } catch (err: any) {
      toast.error(err?.response?.data.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={formSubmitHandler} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Acme Inc account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                {data.email === "" && loading && (
                  <p className="error-message">Email is required</p>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
                {data.password === "" && loading && (
                  <p className="error-message">Password is required</p>
                )}
              </div>
              <Button disabled={loading} type="submit" className="w-full">
                {loading ? "Loading..." : "Login"}
              </Button>
              {loading && (
                <p className="bg-red-300 py-2 px-8 text-gray-800 rounded-lg font-semibold">
                  {loading}
                </p>
              )}
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src={authImage}
              alt="Authentication"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default LoginForm;
