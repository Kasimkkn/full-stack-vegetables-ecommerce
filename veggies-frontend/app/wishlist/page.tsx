"use client"
import ProductCard from '@/components/ui/ProductCard';
import { getWishlist, removeFromWishlist } from '@/service/wishlist.service';
import { WishlistItems } from '@/types/Types';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const page = () => {
    const [wishlist, setWishlist] = useState<WishlistItems[]>([]);
    const userId = JSON.parse(localStorage.getItem('veggies:user')!)?.data?._id
    const getAllUserWishlists = async () => {
        try {
            const res = await getWishlist(userId)
            if (res.data.success) {
                setWishlist(res.data.wishlist.item)
            }
        } catch (error) {
            console.log('error in get wishlist', error)
        }
    }
    useEffect(() => {
        getAllUserWishlists()
    }, []);

    const removeItem = async (id: string) => {
        try {
            const reponse = await removeFromWishlist({ productId: id, userId })
            if (reponse.data.success) {
                toast.success(reponse.data.message)
                getAllUserWishlists()
            }
        } catch (error) {
            console.log('error in update quantity', error)
        }
    };

    return (
        <div className='md:pt-24 pb-10'>
            <h2 className="text-3xl font-bold mb-4 text-center my-5">Wishlist</h2>
            <div className='flex justify-center items-center pt-4'>
                {wishlist.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                        {wishlist.map((product: WishlistItems, index: number) => (
                            <div className='relative'>
                                <ProductCard
                                    key={index}
                                    image={product.photo}
                                    price={product.price}
                                    title={product.name}
                                    productId={product.productId}
                                    isHeartIcon={false}
                                    stock={product.stock}
                                />
                                <button onClick={() => removeItem(product.productId)} className='absolute -top-2 -left-2 p-2 rounded-full bg-black'>
                                    <Trash2 className='text-red-500' />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-center py-8">
                        No items in wishlist
                    </p>
                )}
            </div>
        </div>
    )
}

export default page