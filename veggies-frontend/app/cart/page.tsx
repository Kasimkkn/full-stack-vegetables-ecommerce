"use client"
import { getCart, removeFromCart, updateCartQuantity } from '@/service/cart.service';
import { fetchLatestProducts } from '@/service/products.service';
import { CartItems, Product } from '@/types/Types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CartPage = () => {
    const [cart, setCart] = useState<CartItems[]>([]);
    const userId = JSON.parse(localStorage.getItem('veggies:user')!)?.data?._id
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

    const updateQuantity = async (id: string, quantity: number) => {
        try {
            const reponse = await updateCartQuantity({ productId: id, quantity, userId })
            if (reponse.data.success) {
                toast.success(reponse.data.message)
                getAllUserCartItem()
            }
        } catch (error) {
            console.log('error in update quantity', error)
        }
    };

    const removeItem = async (id: string) => {
        try {
            const reponse = await removeFromCart({ productId: id, userId })
            if (reponse.data.success) {
                toast.success(reponse.data.message)
                getAllUserCartItem()
            }
        } catch (error) {
            console.log('error in update quantity', error)
        }
    };

    const totalPrice = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );


    return (
        <section className="bg-white py-4 antialiased dark:bg-gray-900 md:py-20">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Shopping Cart</h2>
                <div className="mt-6 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        <div className="grid sm:grid-cols-2 grid-cols-1  gap-2">
                            {cart?.length > 0 ? (
                                cart?.map((product, index) => (
                                    <div key={product._id} className="relative rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
                                        <div className="flex justify-between">
                                            <a href="#" className="shrink-0">
                                                <img className="h-20 w-20" src={product.photo} alt={product.name} />
                                            </a>
                                            <div className="flex items-end order-3">
                                                <div className="flex items-baseline">
                                                    <button
                                                        onClick={() => updateQuantity(product.productId, product.quantity - 1)}
                                                        type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 ">
                                                        <svg className="h-2.5 w-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="2" d="M1 1h16" />
                                                        </svg>
                                                    </button>
                                                    <input type="text" id="counter-input" data-input-counter className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0" placeholder="" value={product.quantity} required />
                                                    <button
                                                        onClick={() => updateQuantity(product.productId, product.quantity + 1)}
                                                        type="button" id="increment-button" data-input-counter-increment="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200  ">
                                                        <svg className="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="2" d="M9 1v16M1 9h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex items-start justify-center flex-col order-2">
                                                <a href="#" className="text-base font-medium text-gray-900">{product.name}</a>
                                                <p className="text-base font-bold text-gray-900">₹{product.price}</p>
                                            </div>
                                            <button
                                                onClick={() => removeItem(product.productId)}
                                                type="button" className="bg-gray-300 flex items-center justify-center p-1 rounded-full absolute top-2 right-1 text-sm font-medium text-red-600 dark:text-red-500">
                                                <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                )
                                )) : (
                                <div className='flex items-center justify-center w-full'>
                                    <div className="text-center text-gray-500">Your cart is empty.</div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm  sm:p-6">
                            <p className="text-xl font-semibold text-gray-900">Order summary</p>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                                        <dd className="text-base font-medium text-gray-900">₹{totalPrice}.00</dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                                        <dd className="text-base font-medium text-gray-900">₹19</dd>
                                    </dl>
                                </div>

                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                                    <dt className="text-base font-bold text-gray-900">Total</dt>
                                    <dd className="text-base font-bold text-gray-900">₹{totalPrice + 19}.00</dd>
                                </dl>
                            </div>

                            <Link href="/checkout" className="flex w-full items-center justify-center rounded-lg bg-mainBg px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-mainBg dark:focus:ring-primary-800">Proceed to Checkout</Link>

                            <div className="flex items-center justify-center gap-2">
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                                <Link href="/products" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                                    Continue Shopping
                                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm  sm:p-6">
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-900"> Do you have a voucher or gift card? </label>
                                    <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600  dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
                                </div>
                                <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-mainBg px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-mainBg dark:focus:ring-primary-800">Apply Code</button>
                            </form>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CartPage