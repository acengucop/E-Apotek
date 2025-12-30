import { Box, Container, Typography, Button, Chip, Paper } from '@mui/material';
// FIX: Import Grid dari Unstable_Grid2 (Kompatibel v5/v6/v7)
import Grid from '@mui/material/Grid';

// FIX: Direct Import Icons
import LocalPharmacy from '@mui/icons-material/LocalPharmacy';
import ArrowForward from '@mui/icons-material/ArrowForward';
import WhatsApp from '@mui/icons-material/WhatsApp';

import { type HeroSlide } from '../../lib/api';

interface HeroSectionProps {
  slides: HeroSlide[];
}

const HeroSection = ({ slides }: HeroSectionProps) => {
  return (
    <Box 
      sx={{ 
        // UI IMPROVEMENT: Gradient Background halus (Emerald to White)
        background: 'linear-gradient(135deg, #ecfdf5 0%, #ffffff 100%)', 
        pt: { xs: 4, md: 12 }, // Mobile: Padding atas kecil, Desktop: Besar
        pb: { xs: 8, md: 12 }, 
        position: 'relative', 
        overflow: 'hidden' 
      }}
    >
      {/* Dekorasi Background (Lingkaran Hijau Samar di pojok) */}
      <Box sx={{ 
        position: 'absolute', top: -100, right: -100, width: 400, height: 400, 
        bgcolor: '#059669', opacity: 0.05, borderRadius: '50%', zIndex: 0 
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        
        {/* GRID CONTAINER */}
        <Grid container spacing={{ xs: 6, md: 4 }} alignItems="center">
          
          {/* BAGIAN 1: TEXT & CTA (Call to Action) */}
          {/* ORDER LOGIC: 
              xs: 2 -> Di HP, teks ada di urutan kedua (bawah)
              md: 1 -> Di Laptop, teks ada di urutan pertama (kiri)
          */}
          <Grid 
            size={{ xs: 12, md: 6 }} 
            sx={{ order: { xs: 2, md: 1 }, textAlign: { xs: 'center', md: 'left' } }}
          >
            <Chip 
              label="Terpercaya sejak 2010" 
              size="small" 
              sx={{ mb: 2, fontWeight: 'bold', bgcolor: '#d1fae5', color: '#059669' }} 
            />
            
            {/* Typography Responsif (Clamp) */}
            <Typography 
              variant="h1" 
              color="text.primary" 
              gutterBottom 
              sx={{ 
                lineHeight: 1.2, 
                fontWeight: 800,
                // Font size mengecil otomatis di HP
                fontSize: { xs: '2.25rem', sm: '3rem', md: '3.75rem' } 
              }}
            >
              Solusi Kesehatan <br />
              <span style={{ color: '#059669' }}>Keluarga Anda</span>
            </Typography>
            
            <Typography 
              variant="h6" 
              color="text.secondary" 
              paragraph 
              sx={{ 
                mb: 4, 
                fontWeight: 400,
                fontSize: { xs: '1rem', md: '1.125rem' }, // Font body nyaman dibaca
                lineHeight: 1.6,
                maxWidth: { xs: '100%', md: '90%' }
              }}
            >
              Dapatkan obat resep, vitamin, dan kebutuhan medis lengkap dengan pengiriman cepat, aman, dan konsultasi apoteker gratis.
            </Typography>

            {/* Tombol Aksi */}
            <Box 
              sx={{ 
                display: 'flex', 
                gap: 2, 
                flexDirection: { xs: 'column', sm: 'row' }, // HP: Stack vertikal, Tablet+: Horizontal
                justifyContent: { xs: 'center', md: 'flex-start' } 
              }}
            >
              <Button 
                variant="contained" 
                size="large" 
                endIcon={<ArrowForward />} 
                sx={{ 
                  borderRadius: 3, 
                  py: 1.5,
                  px: 4,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  bgcolor: '#059669',
                  boxShadow: '0 8px 16px rgba(5, 150, 105, 0.2)',
                  '&:hover': { bgcolor: '#047857', transform: 'translateY(-2px)' }
                }}
              >
                Beli Obat
              </Button>
              <Button 
                variant="outlined" 
                size="large" 
                startIcon={<WhatsApp />}
                sx={{ 
                  borderRadius: 3, 
                  py: 1.5,
                  px: 4,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  borderColor: '#059669',
                  color: '#059669',
                  '&:hover': { bgcolor: '#f0fdf4' }
                }}
                onClick={() => window.open('https://wa.me/628123456789', '_blank')}
              >
                Konsultasi
              </Button>
            </Box>
          </Grid>

          {/* BAGIAN 2: GAMBAR HERO */}
          {/* ORDER LOGIC: 
              xs: 1 -> Di HP, gambar muncul duluan (atas)
              md: 2 -> Di Laptop, gambar di kanan
          */}
          <Grid 
            size={{ xs: 12, md: 6 }} 
            sx={{ order: { xs: 1, md: 2 } }}
          >
            {slides.length > 0 ? (
              <Box 
                sx={{ 
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  // Efek bayangan radial di bawah gambar agar terlihat melayang
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    bottom: -30,
                    width: '60%',
                    height: 20,
                    background: 'radial-gradient(ellipse at center, rgba(5, 150, 105, 0.2) 0%, rgba(0,0,0,0) 70%)',
                    zIndex: 0
                  }
                }}
              >
                <Box
                  component="img"
                  src={slides[0].gambar}
                  alt={slides[0].judul}
                  sx={{ 
                    width: '100%', 
                    maxWidth: 500,
                    // Batasi tinggi gambar di HP agar konten teks tidak terlalu ke bawah
                    maxHeight: { xs: 280, md: 500 }, 
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))',
                    // Animasi floating (naik turun halus)
                    animation: 'float 6s ease-in-out infinite',
                    zIndex: 1
                  }}
                />
                 {/* Definisi Keyframes untuk animasi */}
                 <style>
                    {`
                      @keyframes float {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-20px); }
                        100% { transform: translateY(0px); }
                      }
                    `}
                  </style>
              </Box>
            ) : (
              // Fallback jika API kosong
              <Paper 
                elevation={0}
                sx={{ 
                  width: '100%', 
                  height: { xs: 250, md: 400 }, 
                  bgcolor: 'rgba(255,255,255,0.5)', 
                  borderRadius: 4, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  border: '2px dashed #a7f3d0'
                }}
              >
                <Box sx={{ textAlign: 'center', color: '#059669' }}>
                  <LocalPharmacy sx={{ fontSize: { xs: 60, md: 100 }, mb: 2, opacity: 0.3 }} />
                  <Typography fontWeight="bold" sx={{ opacity: 0.6 }}>Apotek Sehat</Typography>
                </Box>
              </Paper>
            )}
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;