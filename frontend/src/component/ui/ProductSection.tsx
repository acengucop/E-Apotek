import { Box, Container, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip, Skeleton } from '@mui/material';
// FIX: Gunakan Unstable_Grid2 agar prop 'size' berfungsi stabil
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom'; 

import ArrowForward from '@mui/icons-material/ArrowForward';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import SentimentDissatisfied from '@mui/icons-material/SentimentDissatisfied';

import { type Produk } from '../../lib/api';

interface ProductSectionProps {
  products: Produk[];
  loading: boolean;
}

const ProductSection = ({ products, loading }: ProductSectionProps) => {
  const navigate = useNavigate();

  // Handler agar tombol Beli (di Desktop) tidak memicu navigasi ke detail
  const handleBuyClick = (e: React.MouseEvent, productName: string) => {
    e.stopPropagation();
    window.open(`https://wa.me/628123456789?text=Saya%20mau%20beli%20${productName}`, '_blank');
  };

  return (
    <Box sx={{ bgcolor: 'white', py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        
        {/* HEADER SECTION */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
              Produk Unggulan
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', md: 'block' } }}>
              Pilihan terbaik minggu ini
            </Typography>
          </Box>
          <Button 
            endIcon={<ArrowForward />} 
            onClick={() => navigate('/produk')}
            sx={{ fontWeight: 'bold' }}
          >
            Lihat Semua
          </Button>
        </Box>

        {/* PRODUCT GRID */}
        {/* Spacing: 2 (sedang) agar pas untuk 2 kolom */}
        <Grid container spacing={2}>
          
          {loading ? (
            // SKELETON LOADING (2 Kolom di HP)
            Array.from(new Array(4)).map((_, index) => (
              <Grid size={{ xs: 6, sm: 6, md: 3 }} key={index}>
                <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 2, mb: 1 }} />
                <Skeleton width="80%" />
                <Skeleton width="40%" />
              </Grid>
            ))
          ) : products.length > 0 ? (
            products.map((produk) => (
              // GRID LOGIC 2x2 MOBILE:
              // xs: 6 -> 12 dibagi 6 = 2 Kolom (Mobile)
              // md: 3 -> 12 dibagi 3 = 4 Kolom (Desktop)
              <Grid size={{ xs: 6, sm: 6, md: 3 }} key={produk.id}>
                <Card 
                  elevation={0}
                  // NAVIGASI KE DETAIL SAAT DIKLIK
                  onClick={() => navigate(`/produk/${produk.id}`)}
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    position: 'relative',
                    border: '1px solid #f1f5f9',
                    borderRadius: { xs: 3, md: 4 }, // Radius sudut lebih modern
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': { transform: 'translateY(-4px)', borderColor: '#10b981', boxShadow: 3 }
                  }}
                >
                  {/* Gambar Produk */}
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      // Tinggi gambar disesuaikan untuk 2 kolom
                      sx={{ 
                        height: { xs: 140, md: 200 }, 
                        objectFit: 'cover', 
                        p: { xs: 1, md: 2 }, 
                        borderRadius: { xs: 3, md: 4 } 
                      }}
                      image={produk.gambar}
                      alt={produk.nama}
                    />
                    
                    {/* Badge Unggulan (Hanya Desktop agar Mobile bersih) */}
                    {produk.is_unggulan && (
                       <Chip 
                        label="Unggulan" 
                        color="warning" 
                        size="small" 
                        sx={{ 
                          display: { xs: 'none', md: 'flex' },
                          position: 'absolute', top: 10, right: 10, 
                          fontWeight: 'bold', fontSize: '0.7rem' 
                        }} 
                      />
                    )}
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, md: 2 }, pt: 0 }}>
                    {/* Kategori (Desktop Only) */}
                    <Typography 
                      gutterBottom variant="subtitle2" color="primary" 
                      sx={{ display: { xs: 'none', md: 'block' }, fontSize: '0.8rem' }}
                    >
                      {produk.kategori_nama}
                    </Typography>

                    {/* Nama Produk */}
                    <Typography 
                      variant="h6" 
                      component="div" 
                      sx={{ 
                        mb: 0.5, 
                        fontWeight: 'bold',
                        // Font Size disesuaikan untuk 2 kolom
                        fontSize: { xs: '0.9rem', md: '1.1rem' },
                        lineHeight: 1.3,
                        height: '2.6em', // Batasi 2 baris
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {produk.nama}
                    </Typography>

                    {/* Harga */}
                    <Typography 
                      variant="h6" 
                      color="secondary" 
                      fontWeight="bold"
                      sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
                    >
                      Rp {parseInt(produk.harga.toString()).toLocaleString('id-ID')}
                    </Typography>
                  </CardContent>

                  {/* Tombol Keranjang (Desktop Only) */}
                  {/* Di Mobile, user cukup klik kartu untuk masuk ke detail */}
                  <CardActions sx={{ p: 2, pt: 0, display: { xs: 'none', md: 'flex' } }}>
                    <Button 
                      variant="outlined" 
                      fullWidth 
                      startIcon={<ShoppingCart />}
                      onClick={(e) => handleBuyClick(e, produk.nama)}
                      sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
                    >
                      Keranjang
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
             <Box sx={{ width: '100%', textAlign: 'center', py: 4 }}>
                <SentimentDissatisfied color="disabled" sx={{ fontSize: 40 }} />
                <Typography color="text.secondary">Belum ada produk unggulan.</Typography>
             </Box>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductSection;