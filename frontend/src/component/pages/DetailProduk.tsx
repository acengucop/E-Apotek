import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, Container, Typography, Button, IconButton, Chip, 
  Paper, Tabs, Tab, Skeleton, Breadcrumbs, Link, Divider, Alert
} from '@mui/material';

// FIX: Gunakan Unstable_Grid2 agar prop 'size' jalan & layout aman
import Grid from '@mui/material/Grid';

// Icons Direct Import
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import ArrowBack from '@mui/icons-material/ArrowBack';
import VerifiedUser from '@mui/icons-material/VerifiedUser';
import LocalShipping from '@mui/icons-material/LocalShipping';
import NavigateNext from '@mui/icons-material/NavigateNext';
import WhatsApp from '@mui/icons-material/WhatsApp';

import { api, type Produk } from '../../lib/api';

const DetailProduk = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<Produk | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // --- TAMBAHAN BARU DISINI ---
    // Scroll ke paling atas setiap kali halaman dimuat
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        setLoading(true);
        if (!id) throw new Error("ID Produk tidak valid");
        const data = await api.getProductDetail(parseInt(id));
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat detail produk.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]); // Dependensi [id] memastikan ini jalan setiap ganti produk

  const handleQuantity = (type: 'inc' | 'dec') => {
    if (type === 'inc') setQuantity(prev => prev + 1);
    if (type === 'dec') setQuantity(prev => Math.max(1, prev - 1));
  };

  if (loading) return <LoadingSkeleton />;

  if (error || !product) return (
    <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
      <Alert severity="error" sx={{ mb: 2, justifyContent: 'center' }}>{error}</Alert>
      <Button variant="outlined" startIcon={<ArrowBack />} onClick={() => navigate('/produk')}>
        Kembali ke Katalog
      </Button>
    </Container>
  );

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: { xs: 2, md: 4 } }}>
      <Container maxWidth="lg">
        
        {/* 1. BREADCRUMBS */}
        <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: { xs: 2, md: 4 } }}>
          <Link underline="hover" color="inherit" onClick={() => navigate('/')} sx={{ cursor: 'pointer', fontSize: { xs: '0.8rem', md: '1rem' } }}>
            Beranda
          </Link>
          <Link underline="hover" color="inherit" onClick={() => navigate('/produk')} sx={{ cursor: 'pointer', fontSize: { xs: '0.8rem', md: '1rem' } }}>
            Obat
          </Link>
          <Typography color="text.primary" sx={{ fontSize: { xs: '0.8rem', md: '1rem' }, fontWeight: 600 }}>
            {product.nama.substring(0, 20)}...
          </Typography>
        </Breadcrumbs>

        <Paper elevation={0} sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid #e2e8f0', p: { xs: 2, md: 4 } }}>
          
          <Grid container spacing={{ xs: 3, md: 6 }}>
            
            {/* 2. BAGIAN KIRI: GAMBAR */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box 
                sx={{ 
                  bgcolor: '#f1f5f9', 
                  borderRadius: 3, 
                  overflow: 'hidden', 
                  position: 'relative',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  minHeight: { xs: 300, md: 450 } 
                }}
              >
                <Box 
                  component="img"
                  src={product.gambar}
                  alt={product.nama}
                  sx={{ 
                    width: '100%', height: '100%', objectFit: 'contain',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'scale(1.05)' }
                  }}
                />
              </Box>
            </Grid>

            {/* 3. BAGIAN KANAN: INFO */}
            <Grid size={{ xs: 12, md: 7 }}>
              
              <Chip 
                label={product.kategori_nama} 
                size="small" 
                color="primary" 
                sx={{ mb: 2, fontWeight: 600, bgcolor: '#ecfdf5', color: '#059669' }} 
              />
              
              <Typography 
                variant="h4" 
                fontWeight="bold" 
                color="text.primary" 
                sx={{ 
                  mb: 1, 
                  fontSize: { xs: '1.5rem', md: '2.125rem' },
                  lineHeight: 1.2 
                }}
              >
                {product.nama}
              </Typography>
              
              <Typography 
                variant="h4" 
                color="primary.main" 
                fontWeight={800} 
                sx={{ 
                  mb: 3,
                  fontSize: { xs: '1.75rem', md: '2.125rem' } 
                }}
              >
                Rp {parseInt(product.harga.toString()).toLocaleString('id-ID')}
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
                {product.deskripsi.substring(0, 150)}...
              </Typography>

              {/* Quantity Selector */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>
                <Typography fontWeight="bold">Jumlah:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: 2 }}>
                  <IconButton onClick={() => handleQuantity('dec')} size="small"><Remove fontSize="small"/></IconButton>
                  <Typography sx={{ mx: 2, minWidth: 20, textAlign: 'center', fontWeight: 'bold' }}>{quantity}</Typography>
                  <IconButton onClick={() => handleQuantity('inc')} size="small"><Add fontSize="small"/></IconButton>
                </Box>
              </Box>

              {/* Tombol Aksi */}
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  startIcon={<ShoppingCart />}
                  sx={{ 
                    flex: 1, py: 1.5, borderRadius: 3, bgcolor: '#059669', 
                    fontSize: '1rem',
                    '&:hover': { bgcolor: '#047857' }
                  }}
                >
                  Keranjang ({quantity})
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  startIcon={<WhatsApp />} 
                  sx={{ flex: 1, py: 1.5, borderRadius: 3, borderColor: '#059669', color: '#059669' }}
                  onClick={() => window.open(`https://wa.me/628123456789?text=Saya%20mau%20beli%20${product.nama}%20jumlah%20${quantity}`, '_blank')}
                >
                  Beli via WA
                </Button>
              </Box>

              {/* Trust Badges */}
              <Grid container spacing={2} sx={{ mt: 4 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', bgcolor: '#f8fafc', p: 1, borderRadius: 2 }}>
                    <VerifiedUser color="success" />
                    <Typography variant="caption" fontWeight="bold">100% Original & Aman</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', bgcolor: '#f8fafc', p: 1, borderRadius: 2 }}>
                    <LocalShipping color="secondary" />
                    <Typography variant="caption" fontWeight="bold">Pengiriman Cepat</Typography>
                  </Box>
                </Grid>
              </Grid>

            </Grid>
          </Grid>

          {/* 4. DETAIL TABS */}
          <Box sx={{ mt: { xs: 4, md: 8 } }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={activeTab} 
                onChange={(_, v) => setActiveTab(v)} 
                textColor="primary" 
                indicatorColor="primary"
                variant="fullWidth"
              >
                <Tab label="Deskripsi" sx={{ textTransform: 'none', fontWeight: 600 }} />
                <Tab label="Aturan Pakai" sx={{ textTransform: 'none', fontWeight: 600 }} />
                <Tab label="Efek Samping" sx={{ textTransform: 'none', fontWeight: 600 }} />
              </Tabs>
            </Box>
            <Box sx={{ py: 3 }}>
              {activeTab === 0 && (
                <Typography paragraph sx={{ lineHeight: 1.8, color: 'text.secondary', fontSize: { xs: '0.9rem', md: '1rem' } }}>
                  {product.deskripsi}
                </Typography>
              )}
              {activeTab === 1 && (
                <Typography paragraph sx={{ lineHeight: 1.8, color: 'text.secondary', fontSize: { xs: '0.9rem', md: '1rem' } }}>
                  Informasi aturan pakai belum tersedia. Harap konsultasikan dengan dokter.
                </Typography>
              )}
              {activeTab === 2 && (
                <Typography paragraph sx={{ lineHeight: 1.8, color: 'text.secondary', fontSize: { xs: '0.9rem', md: '1rem' } }}>
                   Tidak semua orang mengalami efek samping. Jika terjadi reaksi alergi, segera hentikan pemakaian.
                </Typography>
              )}
            </Box>
          </Box>

        </Paper>
      </Container>
    </Box>
  );
};

const LoadingSkeleton = () => (
  <Container maxWidth="lg" sx={{ py: 8 }}>
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, md: 5 }}>
        <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 3 }} />
      </Grid>
      <Grid size={{ xs: 12, md: 7 }}>
        <Skeleton width="30%" height={32} sx={{ mb: 2 }} />
        <Skeleton width="80%" height={48} sx={{ mb: 2 }} />
        <Skeleton width="40%" height={48} sx={{ mb: 4 }} />
        <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 2, mb: 2 }} />
      </Grid>
    </Grid>
  </Container>
);

export default DetailProduk;