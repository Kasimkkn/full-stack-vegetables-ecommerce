import { Carousel } from "flowbite-react";
import slider1 from '@/assets/img/slider1.jpg'
import slider2 from '@/assets/img/slider2.jpg'
import slider3 from '@/assets/img/slider3.jpg'
import Image from "next/image";
export default function CarouselSlidesOnly() {
    return (
        <>
            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel pauseOnHover
                    className="rounded-none"
                >
                    <Image
                        width={1000}
                        height={500}
                        src={slider1}
                        alt="slider1"
                    />
                    <Image
                        width={1000}
                        height={500}
                        src={slider2}
                        alt="slider2"
                    />
                    <Image
                        width={1000}
                        height={500}
                        src={slider3}
                        alt="slider3"
                    />
                </Carousel>
            </div>
        </>
    );
}
