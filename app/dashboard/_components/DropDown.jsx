import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { HiOutlineTrash } from "react-icons/hi2";
import Link from "next/link";
import { HiMiniPencilSquare } from "react-icons/hi2";

function DropDown({ courseId, children, handleOnDelete }) {
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
        <DropdownMenuItem>
            <Link href={`/create-course/${courseId}/finish`} className="cursor-pointer">
              <div className="flex gap-1 items-center">
                <HiMiniPencilSquare />
                Edit
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setAlertOpen(true)}>
            <div className="flex gap-1 items-center cursor-pointer">
              <HiOutlineTrash />
              Delete
            </div>
          </DropdownMenuItem>
          
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={alertOpen}>
        <AlertDialogContent className="bg-[#101010] border border-neutral-800 rounded-2xl p-6 sm:max-w-md shadow-2xl shadow-black/80">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold text-[#E1E0CC] tracking-tight">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-neutral-400 leading-relaxed mt-1">
              This action cannot be undone. This will permanently delete this course and all its associated chapters from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 gap-3">
            <AlertDialogCancel
              onClick={() => setAlertOpen(false)}
              className="rounded-full border border-neutral-800 bg-transparent text-neutral-300 hover:bg-neutral-900 hover:text-white px-5 py-2 text-xs font-medium cursor-pointer transition-colors"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleOnDelete();
                setAlertOpen(false);
              }}
              className="rounded-full bg-red-600 text-white hover:bg-red-500 px-5 py-2 text-xs font-medium cursor-pointer border border-transparent transition-colors"
            >
              Delete Course
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default DropDown;
