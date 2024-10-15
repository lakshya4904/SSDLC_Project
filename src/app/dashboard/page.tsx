import { Button } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

export const metadata = {
  title: "Dashboard"
}

const DashboardPage = () => {
  return (
    <div className=''>
      <h1 className='flex justify-center !text-xl !m-auto w-full'>Dashboard</h1>
      <p>This is the dashboard page.</p>

      <br />
      <Button>
        <Link href={"dashboard/createBook"}>Create Book</Link>

      </Button>
    </div>


  )
}

export default DashboardPage