"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Users } from '@/types/Types'

const ProfilePage = () => {
    const router = useRouter()
    const [user, setUser] = useState<Users | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const token = localStorage.getItem('veggies:token')
        if (!token) {
            router.push('/login')
        } else {
            const userData = JSON.parse(localStorage.getItem('veggies:user') as string)?.data
            setUser(userData)
            setLoading(false)
        }
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem('veggies:token')
        localStorage.removeItem('veggies:user')
        router.push('/login')
    }

    return (
        <div className="container mx-auto md:pt-20 md:px-40">
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-pulse bg-gray-300 w-72 h-10 rounded-md"></div>
                </div>
            ) : (
                <div className="bg-gray-50 space-y-4 p-5">
                    <h1 className="text-2xl font-bold text-gray-700">User Profile</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-500">Full Name</label>
                            <input
                                type="text"
                                value={user?.name}
                                className="mt-1 p-2 w-full border-none rounded-md bg-gray-200"
                                placeholder="Full Name"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-500">Email</label>
                            <input
                                type="email"
                                value={user?.email}
                                className="mt-1 p-2 w-full border-none rounded-md bg-gray-200"
                                placeholder="Email Address"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-500">Phone Number</label>
                            <input
                                type="text"
                                value={user?.phoneNumber}
                                className="mt-1 p-2 w-full border-none rounded-md bg-gray-200"
                                placeholder="Phone Number"
                                readOnly
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-500">Address</label>
                            <input
                                type="text"
                                value={user?.address?.address}
                                className="mt-1 p-2 w-full border-none rounded-md bg-gray-200"
                                placeholder="Address"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-500">City</label>
                            <input
                                type="text"
                                value={user?.address?.city}
                                className="mt-1 p-2 w-full border-none rounded-md bg-gray-200"
                                placeholder="City"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-500">State</label>
                            <input
                                type="text"
                                value={user?.address?.state}
                                className="mt-1 p-2 w-full border-none rounded-md bg-gray-200"
                                placeholder="State"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-500">Country</label>
                            <input
                                type="text"
                                value={user?.address?.country}
                                className="mt-1 p-2 w-full border-none rounded-md bg-gray-200"
                                placeholder="Country"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-500">Pincode</label>
                            <input
                                type="text"
                                value={user?.address?.pincode}
                                className="mt-1 p-2 w-full border-none rounded-md bg-gray-200"
                                placeholder="Pincode"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="flex justify-start gap-4 mt-6 items-center">
                        <Link href="/my-order">
                            <span className="p-2 w-full border-none rounded-md bg-gray-200">My Orders</span>
                        </Link>
                        <Link href="/wishlist">
                            <span className="p-2 w-full border-none rounded-md bg-gray-200">Wishlist</span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-red-500 p-2 w-max border-none rounded-md bg-gray-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfilePage
