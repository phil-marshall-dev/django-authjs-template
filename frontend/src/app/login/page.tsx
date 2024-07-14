
import LoginAndRegisterForm from "@/components/LoginAndRegisterForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const serverSession = await getServerSession(authOptions);

  if (serverSession) {
    redirect('/');
  }

  return (
    <LoginAndRegisterForm />
  );
};

