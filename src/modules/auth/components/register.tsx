"use client";

import { useState } from "react";
import { RegisterForm } from "./register-form";
import { RegisterProfileForm } from "./register-profile-form";

export function Register() {
  const [email, setEmail] = useState<string | undefined>();

  if (email) {
    return <RegisterProfileForm />;
  }

  return <RegisterForm onSuccess={setEmail} />;
}
