import React from 'react'
import { AlertCircle, Mail } from "lucide-react"
import Link from 'next/link'

const AdminError = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You are not an admin. Please ask for admin access before attempting to view this page.
        </p>
        <div className="space-y-4">
          <button className="w-full border flex justify-center p-2 rounded-md bg-primary">
            <a className='flex items-center text-white' href="mailto:shubham@gmail.com?subject=Request for Admin Access&body=Hello,%0D%0A%0D%0AI would like to request admin access for the application.%0D%0A%0D%0AThank you.">
              <Mail className="mr-2 h-4 w-4" /> Request Admin Access
            </a>
          </button>
          <button  className="w-full border rounded-md p-2 bg-primary text-white">
            <Link className='w-full' href="/authority/login">Return to Login</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminError