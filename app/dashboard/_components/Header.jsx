
import { UserButton } from '@clerk/nextjs';
import React from 'react'
import { HiAcademicCap } from "react-icons/hi";
import { ModeToggle } from '@/components/ui/ModeToggle'

const Header = () => {
  return (
    <div className='flex justify-between items-center px-8 py-4 border-b border-neutral-900 bg-black/80 backdrop-blur-md sticky top-0 z-40 text-[#E1E0CC]'>
        <div className="flex items-center gap-2">
            <HiAcademicCap className="text-xl text-[#DEDBC8]" />
            <span className="text-xs font-mono tracking-widest uppercase text-neutral-500">Workspace Panel</span>
        </div>
        <div className='flex items-center gap-4'>
            <ModeToggle />
            <UserButton afterSignOutUrl="/"/>
        </div>
    </div>
  )
}

export default Header