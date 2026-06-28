"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useContext } from 'react'
import { UserCourseListContext } from '@/app/_context/UserCourseListContext'

const CourseAdd = () => {
    const { userCourseList, setUserCourseList } = useContext(UserCourseListContext);
    const {user} = useUser();
  return (
    <div className='bg-gradient-to-r from-[#111111] to-[#161616] border border-neutral-900 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md relative overflow-hidden'>
      <div className="absolute inset-0 noise-overlay opacity-[0.2] pointer-events-none" />
      <div className="relative z-10">
          <h1 className='text-2xl md:text-3xl font-medium tracking-tight text-[#E1E0CC]'>
            Hello, <span className='font-serif italic text-[#DEDBC8] font-normal'>{user?.fullName || "Learner"}</span>
          </h1>
          <p className='text-xs sm:text-sm text-neutral-400 mt-2 max-w-xl leading-relaxed'>
            Transform any topic into a custom-tailored course path instantly. Define learning goals, generate chapter layouts, and sync contextual YouTube lessons in seconds.
          </p>
      </div>
      <Link href="/create-course" className="relative z-10 shrink-0">
       <button className="bg-[#DEDBC8] hover:bg-[#E1E0CC] text-black font-semibold text-xs sm:text-sm rounded-full px-6 py-3 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md flex items-center justify-center">
         + Create AI Course
       </button>
      </Link>
    </div>
  )
}

export default CourseAdd