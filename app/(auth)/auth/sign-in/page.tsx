import { SignInFormClient } from "@/features/auth/components/sign-form-client";
import Image from "next/image";
import React from "react";

const SignInPage = () => {
  return (
    <div className="space-y-6 flex flex-col justify-center">
      <Image
        src="/logo.svg"
        alt="Vibracode Logo"
        width={100}
        height={100}
        className="mb-8"
        priority
      />
      <SignInFormClient />
    </div>
  )
}

export default SignInPage;
