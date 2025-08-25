import React from "react";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const Login = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value;
  if (token) redirect("/");
  return (
    <section className="h-[100vh]  flex items-center justify-center">
      <div className="m-auto  rounded-lg w-full">
        <LoginForm />
      </div>
    </section>
  );
};

export default Login;
