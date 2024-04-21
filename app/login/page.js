"use client";

import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import AuthForm from "@/components/UI/form/AuthForm";
import { signin } from "@/lib/actions/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase-config";
import Image from "next/image";

function LoginPage() {
  const [state, action] = useFormState(signin, undefined);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="animate-pulse">
          <Image
            src="/images/logo-devlinks-small.svg"
            alt="loading"
            width={62}
            height={62}
          />
        </div>
      </div>
    );
  }

  if (user) {
    router.push("/");
  }
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-neutral-dark-grey font-bold text-2xl">Login</h1>
        <p className="text-neutral-grey">
          Add your details below to get back into the app
        </p>
      </div>
      <AuthForm action={action} state={state} />
    </div>
  );
}

export default LoginPage;
