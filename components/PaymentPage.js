"use client"
import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'
import { useRouter } from 'next/navigation'

const PaymentPage = ({ username }) => {
    // const { data: session } = useSession()

    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        router.push(`/${username}`)
        if (searchParams.get("paymentdone") == true) {
            toast('Thanks for your donation!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: "Bounce",
            });
        }
    }, [])

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
        console.log(u, dbpayments)
    }

    const pay = async (amount) => {
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": currentUser.razorpayid,
            "amount": amount,
            "currency": "INR",
            "name": "Get Me A Chai",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId,
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
    }

    return (
        <>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />

            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='cover w-full relative'>
                <img className='object-cover w-full h-48 md:h-[350]' src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/16.gif?token-time=1728000000&amp;token-hash=wSuXa5NkmV6E2Cud5d-IPAIyw5tlVp_71iHLQXFQfX0%3D" alt="" />
                <div className='absolute -bottom-20 right-[30%] md:right-[44%]  border-white border-2 rounded-full'>
                    <img className='rounded-full' width={150} height={150} src={currentUser.profilepic} alt="" />
                </div>
            </div>

            <div className='info flex justify-center items-center my-24 flex-col gap-2'>

                <div className='font-bold text-lg'>
                    @{username}
                </div>

                <div className='text-slate-500'>
                    Let's help {currentUser.name} to get a chai
                </div>

                <div className='text-slate-500'>
                    {payments.length} Payments . {currentUser.name} has raised ₹{payments.reduce((a, b) => a + b.amount, 0)}
                </div>

                <div className='payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row'>

                    <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
                        {/* Show list of all the supporters */}
                        <h2 className='text-2xl font-bold my-5'>Supporters</h2>
                        <ul className='mx-5 text-lg'>
                            {payments.length === 0 && <span>No Payments yet</span>}
                            {payments.map((p, i) => {
                                return <li key={i} className='my-4 flex gap-2 items-center'>
                                    <img className='border rounded-full' width={33} src="user.gif" alt="user avatar" />
                                    <span>
                                        {p.name} has donated <span className='font-bold'>₹{p.amount / 100}</span> with a message "{p.message}"
                                    </span>
                                </li>
                            })}
                        </ul>
                    </div>

                    <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">

                        <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
                        <div className="flex flex-col gap-2">
                            <div>
                                <input onChange={handleChange} value={paymentform.name} name='name' type="text" className='w-full bg-slate-800 p-3 rounded-lg' placeholder='Enter Name' />
                            </div>
                            <input onChange={handleChange} value={paymentform.message} name='message' type="text" className='w-full bg-slate-800 p-3 rounded-lg' placeholder='Enter Message' />
                            <input onChange={handleChange} value={paymentform.amount} name='amount' type="text" className='w-full bg-slate-800 p-3 rounded-lg' placeholder='Enter Amount' />
                            <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} className='bg-blue-600 p-3 rounded-lg hover:bg-blue-800 disabled:bg-slate-500' disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length < 1}>Pay</button>
                        </div>
                        {/* Or choose from the amounts */}
                        <div className="flex gap-2 mt-5 flex-col md:flex-row">
                            <button onClick={() => pay(1000)} className='bg-green-600 p-3 rounded-lg hover:bg-green-800 disabled:bg-gray-500' disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4}>Pay ₹10</button>
                            <button onClick={() => pay(2000)} className='bg-green-600 p-3 rounded-lg hover:bg-green-800 disabled:bg-gray-500' disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4}>Pay ₹20</button>
                            <button onClick={() => pay(5000)} className='bg-green-600 p-3 rounded-lg hover:bg-green-800 disabled:bg-gray-500' disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4}>Pay ₹50</button>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default PaymentPage
