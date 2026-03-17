"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function RedirectPage() {
  const router = useRouter();
  useEffect(() => { router.replace("/"); }, [router]);
  return (<div className="flex min-h-screen items-center justify-center bg-[#f5f5f5] text-slate-500">Redirecting...</div>);
}
