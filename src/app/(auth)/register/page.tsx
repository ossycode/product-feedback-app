import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import RegisterForm from "@/components/form/RegisterForm";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");

  return <RegisterForm />;
};

export default Page;
