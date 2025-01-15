import PaymentPage from '@/components/PaymentPage'
import React from 'react'
import { notFound } from "next/navigation"
import connectDB from "@/db/connectDb"
import User from "@/models/User"

const username = async ({ params }) => {
    // check if user is present in the database or not if not present show error 404 page
    const checkUser = async () => {
        await connectDB()
        const user = await User.findOne({ username: params.username })
        if (!user) {
            notFound()
        }
    }

    await checkUser()

    return (
        <>
            <PaymentPage username={params.username} />
        </>
    )
}

export default username

export async function generateMetaData(params) {
    return {
        title: `${params.username} - Get Me a Chai`,
    }
}