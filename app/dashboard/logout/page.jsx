"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function Logout() {
  const [alertOpen, setAlertOpen] = useState(true);
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <div>
      <AlertDialog open={alertOpen}>
        <AlertDialogContent className="bg-[#101010] border border-neutral-800 rounded-2xl p-6 sm:max-w-md shadow-2xl shadow-black/80">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold text-[#E1E0CC] tracking-tight">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-neutral-400 leading-relaxed mt-1">
              This action will sign you out of your account. Press Sign Out to continue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 gap-3">
            <AlertDialogCancel
              onClick={() => {
                setAlertOpen(false);
                router.push("/dashboard");
              }}
              className="rounded-full border border-neutral-800 bg-transparent text-neutral-300 hover:bg-neutral-900 hover:text-white px-5 py-2 text-xs font-medium cursor-pointer transition-colors"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-full bg-red-650 text-white hover:bg-red-600 px-5 py-2 text-xs font-medium cursor-pointer border border-transparent transition-colors"
              onClick={() => {
                signOut({ redirectUrl: "/" });
                setAlertOpen(false);
              }}
            >
              Sign Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Logout;

