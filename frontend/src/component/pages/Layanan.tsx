import { useEffect, useState } from 'react';
import { 
  Box, Container, Typography, Card, CardContent, Button, 
  Accordion, AccordionSummary, AccordionDetails, 
  Skeleton, Paper
} from '@mui/material';


import Grid from '@mui/material/Grid';

// FIX: Direct Import Icons
import ExpandMore from '@mui/icons-material/ExpandMore';
import WhatsApp from '@mui/icons-material/WhatsApp';
import LocalPharmacy from '@mui/icons-material/LocalPharmacy';
import Moped from '@mui/icons-material/Moped';
import ReceiptLong from '@mui/icons-material/ReceiptLong';

import { api, type Layanan } from '../../lib/api';

const LayananPage = () => {
  const [services, setServices] = useState<Layanan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await api.getServices();
        setServices(data);
      } catch (error) {
        console.error("Gagal memuat layanan:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh' }}>
      
      {/* 1. HERO HEADER */}
      <Box sx={{ bgcolor: '#ecfdf5', py: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" color="text.primary" sx={{ mb: 2 }}>
            Layanan Kesehatan Lengkap
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}>
            Kami tidak hanya menjual obat, tapi juga memberikan solusi kesehatan menyeluruh untuk Anda dan keluarga.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        
        {/* 2. DAFTAR LAYANAN (Dinamis dari API) */}
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 4, borderLeft: '4px solid #059669', pl: 2 }}>
          Fasilitas & Layanan Kami
        </Typography>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {loading ? (
            // SKELETON LOADING
            Array.from(new Array(3)).map((_, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 4 }} />
              </Grid>
            ))
          ) : (
            // SERVICE CARDS
            services.map((item) => (
              <Grid size={{ xs: 12, md: 4 }} key={item.id}>
                <Card 
                  elevation={0}
                  sx={{ 
                    height: '100%', 
                    borderRadius: 4,
                    border: '1px solid #e2e8f0',
                    transition: '0.3s',
                    '&:hover': { 
                      transform: 'translateY(-5px)', 
                      boxShadow: '0 12px 24px rgba(0,0,0,0.05)',
                      borderColor: '#10b981'
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    {/* Icon Container */}
                    <Box 
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        mx: 'auto', 
                        mb: 3, 
                        bgcolor: '#f0fdf4', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}
                    >
                      {/* Render gambar icon dari API */}
                      <Box 
                        component="img" 
                        src={item.icon} 
                        alt={item.nama_layanan} 
                        sx={{ width: 40, height: 40, objectFit: 'contain' }}
                      />
                    </Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {item.nama_layanan}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {item.deskripsi_singkat}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>


        {/* 3. CARA TEBUS RESEP (Static Info) */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 3, md: 6 }, 
            bgcolor: 'primary.main', 
            color: 'white', 
            borderRadius: 4,
            mb: 8,
            backgroundImage: 'linear-gradient(135deg, #059669 0%, #047857 100%)'
          }}
        >
          <Grid container alignItems="center" spacing={4}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Cara Mudah Tebus Resep
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, mb: 3 }}>
                Tidak perlu antre lama. Cukup foto resep dokter Anda, kirimkan kepada kami, dan obat akan kami antar.
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                startIcon={<WhatsApp />}
                sx={{ 
                  bgcolor: 'white', 
                  color: 'primary.main', 
                  fontWeight: 'bold',
                  '&:hover': { bgcolor: '#f1f5f9' }
                }}
                onClick={() => window.open('https://wa.me/628123456789', '_blank')}
              >
                Upload Resep via WA
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Grid container spacing={2}>
                {[
                  { icon: <ReceiptLong fontSize="large"/>, title: "1. Foto Resep", desc: "Foto resep dokter dengan jelas." },
                  { icon: <LocalPharmacy fontSize="large"/>, title: "2. Konfirmasi", desc: "Apoteker kami akan mengecek ketersediaan & harga." },
                  { icon: <Moped fontSize="large"/>, title: "3. Obat Diantar", desc: "Lakukan pembayaran dan obat dikirim ke rumah." },
                ].map((step, idx) => (
                  <Grid size={{ xs: 12, sm: 4 }} key={idx}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                      <Box sx={{ mb: 1 }}>{step.icon}</Box>
                      <Typography fontWeight="bold" gutterBottom>{step.title}</Typography>
                      <Typography variant="caption" sx={{ opacity: 0.8 }}>{step.desc}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        {/* 4. FAQ (Pertanyaan Umum) */}
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 4, textAlign: 'center' }}>
          Pertanyaan Umum (FAQ)
        </Typography>
        
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          {[
            { q: "Apakah obat dijamin asli?", a: "Ya, 100% obat kami berasal dari distributor farmasi resmi (PBF) dan diawasi oleh apoteker berlisensi." },
            { q: "Berapa lama pengiriman obat?", a: "Untuk wilayah dalam kota, kami menyediakan layanan Instant (1-2 jam). Untuk luar kota menggunakan ekspedisi reguler (2-3 hari)." },
            { q: "Apakah bisa konsultasi tanpa membeli obat?", a: "Tentu! Apoteker kami siap melayani konsultasi gratis mengenai keluhan ringan atau penjelasan aturan pakai obat." },
            { q: "Metode pembayaran apa yang tersedia?", a: "Kami menerima Transfer Bank, E-Wallet (GoPay/OVO), dan Bayar di Tempat (COD) untuk wilayah tertentu." },
          ].map((faq, idx) => (
            <Accordion key={idx} elevation={0} sx={{ mb: 2, border: '1px solid #e2e8f0', borderRadius: '12px !important', '&:before': { display: 'none' } }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography fontWeight="bold" color="text.primary">{faq.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">
                  {faq.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

      </Container>
    </Box>
  );
};

export default LayananPage;
