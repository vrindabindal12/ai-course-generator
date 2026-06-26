import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const Header = () => {
  return (
    <div className=' p-5 flex  justify-between shadow-md'>
        <Image src={'/logo.png'} width={150} height={100}/>
        <div className='flex gap-2'>
            <Button>Get Started</Button>
        </div>
       

    </div>
  )
}

export default Header