"use client"
import CarouselSlidesOnly from '@/components/shared/CarouselSlidesOnly'
import LatestProdcuts from '@/components/shared/latestProducts'
import OurFeauted from '@/components/shared/OurFeauted'
import { fetchAllProducts, fetchLatestProducts } from '@/service/products.service';
import { Product } from '@/types/Types';
import axios from 'axios';
import { useEffect, useState } from 'react';

const HomePage = () => {
    const [latestLoading, setLatestLoading] = useState(false);
    const [featuredLoading, setFeaturedLoading] = useState(false);
    const [latestProducts, setLatestProducts] = useState<Product[]>([]);
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);


    const fetchLatest = async () => {
        try {
            setLatestLoading(true);
            const response = await fetchLatestProducts();
            if (response) {
                console.log('response', response);
                const data = response.data.data;
                setLatestProducts(data);
            }
        } catch (error) {
            console.error('Error fetching latest products:', error);
        } finally {
            setLatestLoading(false);
        }
    };

    const fetchFeaturedProducts = async () => {
        try {
            setFeaturedLoading(true);
            const response = await fetchAllProducts();
            if (!response) return
            console.log('response', response);
            const data = response.data.products; setFeaturedProducts(data);
        } catch (error) {
            console.error('Error fetching featured products:', error);
        } finally {
            setFeaturedLoading(false);
        }
    };

    useEffect(() => {
        fetchLatest();
        fetchFeaturedProducts();
    }, []);

    return (
        <main>
            <CarouselSlidesOnly />
            <OurFeauted products={featuredProducts} loading={featuredLoading} />
            <LatestProdcuts products={latestProducts} loading={latestLoading} />
        </main>
    )
}

export default HomePage