
import { UserButton } from '@clerk/nextjs';
import React from 'react'
import { HiAcademicCap } from "react-icons/hi";
import { ModeToggle } from '@/components/ui/ModeToggle'

const Header = () => {
  return (
    <div className='flex justify-between items-center p-5 border-b border-neutral-900 bg-black text-[#E1E0CC]'>
        <HiAcademicCap className="text-2xl text-[#DEDBC8]" />
        <div className='flex gap-2'>
            <ModeToggle />
            <UserButton/>
        </div>
        
    </div>
  )
}

export default Header