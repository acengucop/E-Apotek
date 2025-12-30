import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

// Import komponen UI (Perhatikan path '../')
import HeroSection from '../ui/HeroSection';
import ServiceSection from '../ui/ServiceSection';
import ProductSection from '../ui/ProductSection';

// Import API
import { api, type Produk, type HeroSlide } from '../../lib/api';

const Home = () => {
  // Logic State (Sama seperti di App.tsx sebelumnya)
  const [products, setProducts] = useState<Produk[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await api.getProducts(true); // Ambil produk unggulan
        const heroData = await api.getHeroSlides();      // Ambil slide hero
        setProducts(productData);
        setHeroSlides(heroData);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Box>
      {/* Bagian Hero Banner */}
      <HeroSection slides={heroSlides} />
      
      {/* Bagian Layanan */}
      <ServiceSection />
      
      {/* Bagian Produk Unggulan */}
      <ProductSection products={products} loading={loading} />
    </Box>
  );
};

export default Home;