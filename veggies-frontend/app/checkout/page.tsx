"use client"
import { getCart } from '@/service/cart.service';
import { createNewOrder } from '@/service/order.service';
import { Product, Orders, CartItems } from '@/types/Types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const page = () => {
    const userId = JSON.parse(localStorage.getItem('veggies:user') || '{}')?.data?._id
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [cart, setCart] = useState<CartItems[] | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        country: 'India',
        city: '',
        state: '',
        address: '',
        pincode: '',
    });

    const getAllUserCartItem = async () => {
        try {
            const res = await getCart(userId)
            if (res.data.success) {
                setCart(res.data.cart.item)
            }
        } catch (error) {
            console.log('error in get cart', error)
        }
    }
    useEffect(() => {
        getAllUserCartItem()
    }, []);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        console.log(name, value)
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!cart || cart.length === 0) {
            alert('Cart is empty!');
            return;
        }

        const orderData = {
            shippingInfo: {
                address: formData.address,
                city: formData.city,
                state: formData.state,
                country: formData.country,
                pincode: Number(formData.pincode),
            },
            user: {
                _id: userId,
                email: formData.email
            },
            subtotal: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
            tax: 0,
            shippingCharges: 50,
            discount: 0,
            total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0) + 50,
            status: 'Processing',
            orderItems: cart.map((item) => ({
                name: item.name,
                photo: item.photo,
                price: item.price,
                quantity: item.quantity,
                productId: item.productId,
            })),
        };

        try {
            setLoading(true);
            const response = await createNewOrder(orderData);
            toast.success('Order created successfully!');
            router.push('/my-order');
            console.log(response.data);
        } catch (error) {
            console.error('Error creating order:', error);
        } finally {
            setLoading(false);
        }
    };

    const totalAmount = cart?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

    return (
        <section className="bg-white py-4 antialiased  md:py-24">
            <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500  sm:text-base">
                    <li className="after:border-1 flex items-center text-mainBg after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200   sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                        <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                            <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Cart
                        </span>
                    </li>

                    <li className="after:border-1 flex items-center text-mainBg after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200   sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                        <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                            <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Checkout
                        </span>
                    </li>

                    <li className="flex shrink-0 items-center">
                        <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        Order summary
                    </li>
                </ol>

                <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                    <div className="min-w-0 flex-1 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-mainBg">Delivery Details</h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="your_name" className="mb-2 block text-sm font-medium text-mainBg "> Your name </label>
                                    <input type="text" id="your_name"
                                        value={formData.name}
                                        name="name"
                                        onChange={handleInputChange}
                                        className="block w-full rounded-lg border border-black/10 bg-gray-50 p-2.5 text-sm text-mainBg focus:outline-none outline-none border-none focus:ring-1 focus:ring-black/20" placeholder="kasim Kadiwala" required />
                                </div>

                                <div>
                                    <label htmlFor="your_email" className="mb-2 block text-sm font-medium text-mainBg "> Your email* </label>
                                    <input type="email" id="your_email"
                                        name='email'
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-lg border border-black/10 bg-gray-50 p-2.5 text-sm text-mainBg focus:outline-none outline-none border-none focus:ring-1 focus:ring-black/20" placeholder="name@flowbite.com" required />
                                </div>
                                <div>
                                    <label htmlFor="phone-input-3" className="mb-2 block text-sm font-medium text-mainBg "> Phone Number* </label>
                                    <div className="flex items-center">
                                        <div className="relative w-full">
                                            <input type="text" id="phone-input"
                                                name='phone'
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="block w-full rounded-lg border border-black/10 bg-gray-50 p-2.5 text-sm text-mainBg focus:outline-none outline-none border-none focus:ring-1 focus:ring-black/20" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="address" className="mb-2 block text-sm font-medium text-mainBg "> address </label>
                                    <input type="text" id="address"
                                        name='address'
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-lg border border-black/10 bg-gray-50 p-2.5 text-sm text-mainBg focus:outline-none outline-none border-none focus:ring-1 focus:ring-black/20" placeholder="San Francisco" required />
                                </div>
                                <div>
                                    <div className="mb-2 flex items-center gap-2">
                                        <label htmlFor="country" className="block text-sm font-medium text-mainBg "> Country* </label>
                                    </div>
                                    <input type="text" id="country"
                                        name='country'
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-lg border border-black/10 bg-gray-50 p-2.5 text-sm text-mainBg focus:outline-none outline-none border-none focus:ring-1 focus:ring-black/20" placeholder="San Francisco" required />
                                </div>
                                <div>
                                    <div className="mb-2 flex items-center gap-2">
                                        <label htmlFor="city" className="block text-sm font-medium text-mainBg "> City* </label>
                                    </div>
                                    <input type="text" id="city"
                                        name='city'
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-lg border border-black/10 bg-gray-50 p-2.5 text-sm text-mainBg focus:outline-none outline-none border-none focus:ring-1 focus:ring-black/20" placeholder="San Francisco" required />
                                </div>

                                <div>
                                    <label htmlFor="state" className="mb-2 block text-sm font-medium text-mainBg "> State </label>
                                    <input type="text" id="state"
                                        name='state'
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-lg border border-black/10 bg-gray-50 p-2.5 text-sm text-mainBg focus:outline-none outline-none border-none focus:ring-1 focus:ring-black/20" placeholder="California" required />
                                </div>


                                <div>
                                    <label htmlFor="pincode" className="mb-2 block text-sm font-medium text-mainBg "> Pin code </label>
                                    <input type="text" id="pincode"
                                        name='pincode'
                                        value={formData.pincode}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-lg border border-black/10 bg-gray-50 p-2.5 text-sm text-mainBg focus:outline-none outline-none border-none focus:ring-1 focus:ring-black/20" placeholder="94105" required />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-mainBg ">Payment</h3>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 ">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input id="credit-card" aria-describedby="credit-card-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 " checked />
                                        </div>

                                        <div className="ms-4 text-sm">
                                            <label htmlFor="credit-card" className="font-medium leading-none text-mainBg "> Credit Card </label>
                                            <p id="credit-card-text" className="mt-1 text-xs font-normal text-gray-500 ">Pay with your credit card</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 ">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input id="pay-on-delivery" aria-describedby="pay-on-delivery-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 " />
                                        </div>

                                        <div className="ms-4 text-sm">
                                            <label htmlFor="pay-on-delivery" className="font-medium leading-none text-mainBg "> Payment on delivery </label>
                                            <p id="pay-on-delivery-text" className="mt-1 text-xs font-normal text-gray-500 ">+₹15 payment processing fee</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-mainBg ">Delivery Methods</h3>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 ">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input id="dhl" aria-describedby="dhl-text" type="radio" name="delivery-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 " />
                                        </div>

                                        <div className="ms-4 text-sm">
                                            <label htmlFor="dhl" className="font-medium leading-none text-mainBg "> ₹15 - DHL Fast Delivery </label>
                                            <p id="dhl-text" className="mt-1 text-xs font-normal text-gray-500 ">Get it by Tommorow</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 ">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input id="express" aria-describedby="express-text" type="radio" name="delivery-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 " />
                                        </div>

                                        <div className="ms-4 text-sm">
                                            <label htmlFor="express" className="font-medium leading-none text-mainBg "> ₹49 - Express Delivery </label>
                                            <p id="express-text" className="mt-1 text-xs font-normal text-gray-500 ">Get it today</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flow-root">
                            <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-normal text-gray-500 ">Subtotal</dt>
                                    <dd className="text-base font-medium text-mainBg ">₹{totalAmount}.00</dd>
                                </dl>
                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-normal text-gray-500 ">Tax</dt>
                                    <dd className="text-base font-medium text-mainBg ">₹19</dd>
                                </dl>

                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-bold text-mainBg ">Total</dt>
                                    <dd className="text-base font-bold text-mainBg ">₹{totalAmount + 19}.00</dd>
                                </dl>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button onClick={handleSubmit} className="flex w-full items-center justify-center rounded-lg bg-mainBg px-5 py-2.5 text-sm font-medium text-white ">Proceed to Payment</button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default page