"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Static export doesn't support server-side redirects.
// Do a client-side redirect to the default locale.
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/ja");
  }, [router]);

  return null;
}
