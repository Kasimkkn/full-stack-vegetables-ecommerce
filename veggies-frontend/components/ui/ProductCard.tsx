import { addToCart } from "@/service/cart.service";
import { addToWishlist } from "@/service/wishlist.service";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ProductCardProps {
    image: string;
    title: string;
    price: number;
    productId: string
    isWishlist?: boolean
    isHeartIcon?: boolean
    stock?: number
}
const ProductCard = ({ image, title, price, productId, stock, isWishlist, isHeartIcon = true }: ProductCardProps) => {
    const router = useRouter();
    const userId = JSON.parse(localStorage.getItem('veggies:user')!)?.data?._id

    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        if (isWishlist) {
            setIsWishlisted(isWishlist)
        }
    }, [isWishlist])

    const handlAddProductToCart = async () => {
        try {
            const res = await addToCart({ productId, quantity: 1, userId })
            console.log('res', res)
            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log('error in add to cart', error)
        }
    }

    const handleAddProductToWishlist = async () => {
        try {
            if (userId) {
                const res = await addToWishlist({ productId, userId })
                if (res.data.success) {
                    setIsWishlisted(!isWishlisted)
                    toast.success(res.data.message)
                }
            } else {
                router.push('/login')
            }
        } catch (error) {
            console.log('error in add to wishlist', error)
        }
    }

    return (
        <div
            className="cursor-pointer relative group w-full md:w-[248px] max-md:h-72 bg-white p-2 border border-black/10 rounded-md">
            <div className="overflow-hidden">
                <img
                    className="object-cover
                    
                    w-full md:h-64 h-40 transition-all duration-300 group-hover:scale-105"
                    src={image}
                    alt={title}
                />
            </div>
            {isHeartIcon && (
                <button onClick={handleAddProductToWishlist} className="group-hover:block hidden absolute top-4 right-4">
                    {isWishlisted ? <Heart size={25} className="text-red-600" fill="red" />
                        :
                        <Heart size={25} className="text-red-600" />
                    }
                </button>
            )}
            <div className="flex items-start justify-between mt-4 space-x-4">
                <h3 className="text-sm md:text-xl font-bold text-gray-900">
                    {title}
                </h3>
                <div className="text-right">
                    <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                        ₹{price.toFixed(2)}
                    </p>
                </div>
            </div>
            <div className="mt-3 flex items-center gap-2.5">

                {stock! <= 0 ? (
                    <button
                        type="button" className="inline-flex w-full items-center justify-center rounded-lg bg-red-500 px-5 py-2.5 text-sm font-medium  text-white ">
                        <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                        </svg>
                        Out of Stock
                    </button>
                ) : (
                    <button
                        onClick={handlAddProductToCart}
                        type="button" className="inline-flex w-full items-center justify-center rounded-lg bg-mainBg px-5 py-2.5 text-sm font-medium  text-white ">
                        <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                        </svg>
                        Add to cart
                    </button>
                )
                }
            </div >
        </div >
    );
};

export default ProductCard;