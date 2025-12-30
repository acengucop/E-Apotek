import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate untuk pindah halaman
import { 
  Box, Container, Typography, TextField, InputAdornment, 
  Card, CardMedia, CardContent, Button, 
  Skeleton, Chip, List, ListItemButton, ListItemText, ListItemIcon,
  Paper, Divider
} from '@mui/material';

// FIX: Gunakan Unstable_Grid2 agar prop 'size' berfungsi
import Grid from '@mui/material/Grid'; 

// Icons
import Search from '@mui/icons-material/Search';
import Category from '@mui/icons-material/Category';
import FilterList from '@mui/icons-material/FilterList';
import SentimentDissatisfied from '@mui/icons-material/SentimentDissatisfied';

import { api, type Produk, type KategoriProduk } from '../../lib/api';

const ProdukPage = () => {
  const navigate = useNavigate(); // 2. Hook Navigasi

  // --- STATE ---
  const [products, setProducts] = useState<Produk[]>([]);
  const [categories, setCategories] = useState<KategoriProduk[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [prodData, catData] = await Promise.all([
          api.getProducts(),
          api.getCategories()
        ]);
        setProducts(prodData);
        setCategories(catData);
      } catch (error) {
        console.error("Gagal mengambil data katalog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- FILTER LOGIC ---
  const filteredProducts = products.filter((item) => {
    const matchSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory ? item.kategori === selectedCategory : true;
    return matchSearch && matchCategory;
  });

  // Fungsi saat tombol Beli diklik
  const handleBuyClick = (e: React.MouseEvent, phone: string, productName: string) => {
    e.stopPropagation(); // Mencegah masuk ke halaman detail saat klik tombol beli
    // Langsung arahkan ke WA
    window.open(`https://wa.me/${phone}?text=Saya%20mau%20beli%20${productName}`, '_blank');
  };

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        
        {/* HEADER */}
        <Box sx={{ mb: 6, textAlign: { xs: 'center', md: 'left' } }}>
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            Katalog Obat & Vitamin
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Temukan kebutuhan kesehatan Anda dari berbagai kategori terpercaya.
          </Typography>
        </Box>

        <Grid container spacing={2}>
          
          {/* --- SIDEBAR FILTER --- */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ position: { md: 'sticky' }, top: { md: 100 } }}>
              {/* Search Bar */}
              <Paper elevation={0} sx={{ p: 2, mb: 3, border: '1px solid #e2e8f0', borderRadius: 3 }}>
                <TextField
                  fullWidth
                  placeholder="Cari obat..."
                  variant="outlined"
                  size="small"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (<InputAdornment position="start"><Search color="action" /></InputAdornment>),
                    sx: { borderRadius: 2 }
                  }}
                />
              </Paper>

              {/* Kategori Filter */}
              <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                  <FilterList color="primary" fontSize="small" />
                  <Typography variant="subtitle1" fontWeight="bold">Kategori</Typography>
                </Box>
                
                {/* Mobile: Horizontal Scroll */}
                <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1, overflowX: 'auto', pb: 1 }}>
                  <Chip 
                    label="Semua" onClick={() => setSelectedCategory(null)}
                    color={selectedCategory === null ? "primary" : "default"}
                    variant={selectedCategory === null ? "filled" : "outlined"}
                  />
                  {categories.map((cat) => (
                    <Chip 
                      key={cat.id} label={cat.nama} onClick={() => setSelectedCategory(cat.id)}
                      color={selectedCategory === cat.id ? "primary" : "default"}
                      variant={selectedCategory === cat.id ? "filled" : "outlined"}
                    />
                  ))}
                </Box>

                {/* Desktop: List */}
                <List component="nav" sx={{ display: { xs: 'none', md: 'block' } }}>
                  <ListItemButton 
                    selected={selectedCategory === null} onClick={() => setSelectedCategory(null)}
                    sx={{ borderRadius: 2, mb: 0.5, '&.Mui-selected': { bgcolor: 'primary.lighter', color: 'primary.main' } }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}><Category fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Semua Produk" />
                  </ListItemButton>
                  <Divider sx={{ my: 1 }} />
                  {categories.map((cat) => (
                    <ListItemButton 
                      key={cat.id} selected={selectedCategory === cat.id} onClick={() => setSelectedCategory(cat.id)}
                      sx={{ borderRadius: 2, mb: 0.5, '&.Mui-selected': { bgcolor: '#ecfdf5', color: '#059669', fontWeight: 'bold' } }}
                    >
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: selectedCategory === cat.id ? '#059669' : 'grey.300' }} />
                      </ListItemIcon>
                      <ListItemText primary={cat.nama} />
                    </ListItemButton>
                  ))}
                </List>
              </Paper>
            </Box>
          </Grid>

          {/* --- MAIN CONTENT (Product Grid) --- */}
          <Grid size={{ xs: 12, md: 9 }}>
            
            {!loading && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Menampilkan <strong>{filteredProducts.length}</strong> produk
                </Typography>
              </Box>
            )}

            <Grid container spacing={2}> 
              {loading ? (
                // SKELETON LOADING
                Array.from(new Array(6)).map((_, index) => (
                  <Grid size={{ xs: 6, md: 4 }} key={index}>
                    <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 3, mb: 1 }} />
                    <Skeleton width="80%" />
                    <Skeleton width="40%" />
                  </Grid>
                ))
              ) : filteredProducts.length > 0 ? (
                // PRODUCT LIST
                filteredProducts.map((produk) => (
                  // UBAH DISINI: xs={6} artinya 2 Kolom (12/6 = 2)
                  <Grid size={{ xs: 6, sm: 6, md: 4 }} key={produk.id}>
                    <Card 
                      elevation={0}
                      // 3. Tambahkan onClick di Card Utama untuk ke Detail
                      onClick={() => navigate(`/produk/${produk.id}`)}
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        border: '1px solid #f1f5f9',
                        borderRadius: { xs: 3, md: 4 }, 
                        cursor: 'pointer', // Cursor berubah jadi tangan
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                          borderColor: '#10b981'
                        }
                      }}
                    >
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          sx={{ 
                             height: { xs: 140, md: 200 }, // Tinggi gambar disesuaikan
                             objectFit: 'cover', 
                             bgcolor: '#f1f5f9' 
                          }}
                          image={produk.gambar}
                          alt={produk.nama}
                        />
                        {/* Badge Kategori (Hidden di HP biar gambar jelas) */}
                        <Chip 
                          label={produk.kategori_nama} 
                          size="small"
                          sx={{ 
                            display: { xs: 'none', md: 'flex' },
                            position: 'absolute', bottom: 8, left: 8, 
                            bgcolor: 'rgba(255,255,255,0.9)', fontWeight: 600, fontSize: '0.7rem'
                          }} 
                        />
                      </Box>
                      
                      <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, md: 2.5 } }}>
                        <Typography 
                          variant="subtitle1" 
                          component="div" 
                          sx={{ 
                            fontWeight: 700, 
                            fontSize: { xs: '0.9rem', md: '1rem' }, 
                            mb: 0.5,
                            lineHeight: 1.3,
                            height: '2.6em', // Batasi tinggi teks 2 baris
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {produk.nama}
                        </Typography>
                        <Typography 
                          variant="body1" 
                          color="primary.main" 
                          fontWeight={800}
                          sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
                        >
                          Rp {parseInt(produk.harga.toString()).toLocaleString('id-ID')}
                        </Typography>
                      </CardContent>
                      
                      {/* ACTION BUTTONS */}
                      {/* Tampil di Mobile & Desktop */}
                      <Box sx={{ p: 1.5, pt: 0 }}>
                        <Button 
                          fullWidth 
                          variant="outlined" 
                          size="small"
                          // 4. Tombol Beli dengan e.stopPropagation()
                          onClick={(e) => handleBuyClick(e, '628123456789', produk.nama)}
                          sx={{ 
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 'bold',
                            color: '#059669',
                            borderColor: '#059669',
                            fontSize: { xs: '0.75rem', md: '0.875rem' },
                            '&:hover': { bgcolor: '#059669', color: 'white' }
                          }}
                        >
                          Beli
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <SentimentDissatisfied sx={{ fontSize: 60, color: 'grey.300', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">Produk tidak ditemukan</Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default ProdukPage;
