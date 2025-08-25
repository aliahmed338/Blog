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
import { AVATAR_LINKS } from "@/app/utils/data";

import Image from "next/image";
import Link from "next/link";
import authImage from "../../../public/auth.jpg";
import { cn } from "@/lib/utils";

const RegisterForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");

  const handleAvatarClick = (avatar: string) => {
    setSelectedAvatar(avatar);
  };

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (data.username === "") return toast.error("Username is required");
    if (data.email === "") return toast.error("Email is required");
    if (data.password === "") return toast.error("Password is required");

    try {
      setLoading(true);
      await axios.post(`${DOMAIN}/api/users/register`, {
        username: data.username,
        email: data.email,
        password: data.password,
        image: selectedAvatar,
      });
      router.replace("/login");
      setLoading(false);
      router.refresh();
      toast.success("Registration successful!");
    } catch (err: any) {
      toast.error(err?.response?.data.message || "Registration failed");
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={formSubmitHandler} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-muted-foreground text-balance">
                  Sign up for your Acme Inc account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={data.username}
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                />
                {data.username === "" && loading && (
                  <p className="error-message">Username is required</p>
                )}
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
              <div>
                <div className="flex items-center mb-2">
                  <Label htmlFor="password">Choose Avatar</Label>
                </div>
                {AVATAR_LINKS.map((avatar, key) => (
                  <Image
                    key={key}
                    className={`rounded-full cursor-pointer p-1 inline ${
                      selectedAvatar === avatar
                        ? "border-2 border-primary"
                        : "border-2 border-transparent"
                    }`}
                    onClick={() => handleAvatarClick(avatar)}
                    src={avatar}
                    alt={`avatar`}
                    width={45}
                    height={45}
                  />
                ))}
              </div>
              <Button disabled={loading} type="submit" className="w-full">
                {loading ? "Loading..." : "Register"}
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline">
                  Sign in
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
      <div className="text-muted-foreground text-center  text-balance text-sm">
        By clicking continue, you agree to our{" "}
        <Link href="#" className="underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className="underline">
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
};

export default RegisterForm;
