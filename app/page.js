"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase-config";
import Image from "next/image";

export default function Home() {
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
    router.push("/" + user.uid);
    return;
  } else {
    router.push("/login");
    return;
  }
}
