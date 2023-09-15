import Input from "@/components/ui/Input";
import Button from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import LoginForm from "@/components/form/LoginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const Login = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");

  return <LoginForm />;
};

export default Login;
