import { Box, Container, Typography, Button, Chip, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';

import LocalPharmacy from '@mui/icons-material/LocalPharmacy';
import ArrowForward from '@mui/icons-material/ArrowForward';
import WhatsApp from '@mui/icons-material/WhatsApp';

import { type HeroSlide } from '../../lib/api';

// 1. IMPORT GAMBAR LOKAL ANDA DI SINI
// Pastikan path-nya benar sesuai struktur folder Anda
import heroBg from '../../assets/HD-wallpaper-interior-pharmacy-cute-pharmacy.jpg';

interface HeroSectionProps {
  slides: HeroSlide[];
}

const HeroSection = ({ slides }: HeroSectionProps) => {
  return (
    <Box 
      sx={{ 
        // 2. GUNAKAN VARIABEL GAMBAR DI SINI
        // Teknik Overlay: Gradient Putih Transparan + Gambar Background
        backgroundImage: `linear-gradient(135deg, rgba(236, 253, 245, 0.90) 0%, rgba(255, 255, 255, 0.95) 100%), url(${heroBg})`,
        
        backgroundSize: 'cover',   
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat',
        
        pt: { xs: 4, md: 12 }, 
        pb: { xs: 8, md: 12 }, 
        position: 'relative', 
        overflow: 'hidden' 
      }}
    >
      {/* Dekorasi Background (Lingkaran Hijau Samar) */}
      <Box sx={{ 
        position: 'absolute', top: -100, right: -100, width: 400, height: 400, 
        bgcolor: '#059669', opacity: 0.05, borderRadius: '50%', zIndex: 0 
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        
        <Grid container spacing={{ xs: 6, md: 4 }} alignItems="center">
          
          {/* BAGIAN 1: TEXT & CTA */}
          <Grid 
            size={{ xs: 12, md: 6 }} 
            sx={{ order: { xs: 2, md: 1 }, textAlign: { xs: 'center', md: 'left' } }}
          >
            <Chip 
              label="Terpercaya sejak 2010" 
              size="small" 
              sx={{ mb: 2, fontWeight: 'bold', bgcolor: '#d1fae5', color: '#059669' }} 
            />
            
            <Typography 
              variant="h1" 
              color="text.primary" 
              gutterBottom 
              sx={{ 
                lineHeight: 1.2, 
                fontWeight: 800,
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
                fontSize: { xs: '1rem', md: '1.125rem' }, 
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
                flexDirection: { xs: 'column', sm: 'row' }, 
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

          {/* BAGIAN 2: GAMBAR HERO (SLIDER / ILLUSTRATION) */}
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
                    maxHeight: { xs: 280, md: 500 }, 
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))',
                    animation: 'float 6s ease-in-out infinite',
                    zIndex: 1
                  }}
                />
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