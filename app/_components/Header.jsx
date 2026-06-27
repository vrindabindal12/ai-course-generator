import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Header = () => {
  return (
    <div className=' p-5 flex  justify-between shadow-md'>
        <Link href="/">
            <Image src={'/logo.png'} width={150} height={100}/>
        </Link>
        <div className='flex gap-2'>
            <Button>Get Started</Button>
        </div>
       

    </div>
  )
}

export default Header