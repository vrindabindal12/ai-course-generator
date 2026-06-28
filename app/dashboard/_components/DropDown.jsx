import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { HiOutlineTrash, HiMiniPencilSquare, HiOutlineShare } from "react-icons/hi2";
import { Copy, Check, Twitter } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

// Reusable custom SVG LinkedIn icon fallback since Lucide's icon has case variance
const LinkedInIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const WhatsAppIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.115-2.905-6.99C16.657 1.875 14.181 1.84 12.016 1.84c-5.433 0-9.857 4.42-9.86 9.864 0 1.73.465 3.42 1.345 4.927l-.994 3.63 3.738-.98c1.512.825 3.012 1.25 4.708.813z"/>
  </svg>
);

function DropDown({ courseId, children, handleOnDelete }) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/course/${courseId}`
    : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        variant: "success",
        duration: 3000,
        title: "Link Copied!",
        description: "Course link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        variant: "destructive",
        duration: 3000,
        title: "Failed to copy",
        description: "Could not copy link to clipboard.",
      });
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#151515] border border-neutral-800 text-[#E1E0CC] rounded-xl p-1 shadow-xl">
          <DropdownMenuItem className="hover:bg-neutral-800 focus:bg-neutral-800 focus:text-white cursor-pointer rounded-lg">
            <Link href={`/create-course/${courseId}/finish`} className="w-full">
              <div className="flex gap-2 items-center text-sm py-1">
                <HiMiniPencilSquare className="w-4 h-4 text-primary" />
                Edit
              </div>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem 
            onClick={() => setShareOpen(true)}
            className="hover:bg-neutral-800 focus:bg-neutral-800 focus:text-white cursor-pointer rounded-lg"
          >
            <div className="flex gap-2 items-center text-sm py-1 w-full">
              <HiOutlineShare className="w-4 h-4 text-primary" />
              Share
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem 
            onClick={() => setAlertOpen(true)}
            className="hover:bg-neutral-850 focus:bg-neutral-850 text-red-400 focus:text-red-400 cursor-pointer rounded-lg"
          >
            <div className="flex gap-2 items-center text-sm py-1 w-full">
              <HiOutlineTrash className="w-4 h-4" />
              Delete
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Share Dialog */}
      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent className="bg-[#101010] border border-neutral-800 rounded-2xl p-6 sm:max-w-md shadow-2xl shadow-black/80 text-[#E1E0CC]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold tracking-tight text-[#E1E0CC]">
              Share Course
            </DialogTitle>
            <DialogDescription className="text-xs text-neutral-400 mt-1">
              Anyone with this link will be able to view and study this course.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-4">
            {/* Link Input Row */}
            <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-xl p-2 pl-3">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="bg-transparent border-none text-xs text-neutral-300 w-full focus:outline-none focus:ring-0 select-all"
              />
              <button
                onClick={handleCopyLink}
                className="bg-primary text-black hover:bg-[#c9c6b3] p-2.5 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0 border-none"
                title="Copy Link"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Quick Share Buttons */}
            <div className="grid grid-cols-3 gap-2.5 mt-2">
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent("Check out this course I generated on Prisma!")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-850 text-[10px] font-mono tracking-wide transition-all"
              >
                <Twitter className="w-3.5 h-3.5 fill-[#1d9bf0] text-[#1d9bf0] border-none" />
                Twitter
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-850 text-[10px] font-mono tracking-wide transition-all"
              >
                <LinkedInIcon className="w-3.5 h-3.5 text-[#0077b5]" />
                LinkedIn
              </a>

              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent("Check out this course on Prisma: " + shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-850 text-[10px] font-mono tracking-wide transition-all"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25d366]" />
                WhatsApp
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Alert */}
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
