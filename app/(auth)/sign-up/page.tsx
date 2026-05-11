import { Suspense } from "react";
import { AuthPanel } from "@/components/auth/auth-panel";

export default function SignUpPage() {
  return (
    <main className="min-h-screen">
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-sm text-neutral-400">
            Loading…
          </div>
        }
      >
        <AuthPanel mode="sign-up" />
      </Suspense>
    </main>
  );
}
