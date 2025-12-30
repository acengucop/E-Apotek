import { useState, useEffect } from 'react';
import { 
  AppBar, Toolbar, Typography, Box, Button, Container, 
  Paper, BottomNavigation, BottomNavigationAction 
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

// Icons Import
import LocalPharmacy from '@mui/icons-material/LocalPharmacy';
import WhatsApp from '@mui/icons-material/WhatsApp';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'; // Icon Produk
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'; // Icon Layanan
import ChatIcon from '@mui/icons-material/Chat'; // Icon Kontak

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State untuk Bottom Navigation (0, 1, 2, 3)
  const [bottomNavValue, setBottomNavValue] = useState(0);

  // Mapping URL ke Index Bottom Nav agar tombol aktif sesuai halaman
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setBottomNavValue(0);
    else if (path.startsWith('/produk')) setBottomNavValue(1);
    else if (path.startsWith('/layanan')) setBottomNavValue(2);
    else if (path.startsWith('/kontak')) setBottomNavValue(3);
  }, [location]);

  // Data Menu
  const navItems = [
    { label: 'Beranda', path: '/', icon: <HomeIcon /> },
    { label: 'Produk', path: '/produk', icon: <ShoppingBagIcon /> },
    { label: 'Layanan', path: '/layanan', icon: <MedicalServicesIcon /> },
    { label: 'Kontak', path: '/kontak', icon: <ChatIcon /> },
  ];

  return (
    <>
      {/* --- 1. TOP NAVBAR (LOGO AREA) --- */}
      {/* Muncul di Desktop & Mobile, tapi menu Desktop disembunyikan di Mobile */}
      <AppBar 
        position="sticky" 
        color="inherit" 
        elevation={0} 
        sx={{ 
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          // Glassmorphism Effect
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 0.5, justifyContent: 'space-between' }}>
            
            {/* LOGO (Kiri) */}
            <Box 
              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              <LocalPharmacy color="primary" sx={{ fontSize: { xs: 28, md: 32 }, mr: 1 }} />
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  fontWeight: 800, 
                  color: 'primary.main',
                  letterSpacing: '-0.5px',
                  fontSize: { xs: '1.1rem', md: '1.25rem' }
                }}
              >
                Apotek Sehat
              </Typography>
            </Box>

            {/* MENU DESKTOP (Tengah - Hanya tampil di Laptop) */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Button 
                    key={item.label} 
                    onClick={() => navigate(item.path)}
                    sx={{ 
                      mx: 0.5,
                      color: isActive ? 'primary.main' : 'text.secondary',
                      fontWeight: isActive ? 700 : 500,
                      '&:hover': { color: 'primary.main', bgcolor: 'transparent' }
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Box>

            {/* TOMBOL WA (Kanan) */}
            <Button 
              variant="contained" 
              color="primary" 
              disableElevation
              // Di Mobile cuma icon, di Desktop ada teks
              startIcon={<WhatsApp />} 
              onClick={() => window.open('https://wa.me/628123456789', '_blank')}
              sx={{ 
                borderRadius: 2, 
                fontWeight: 'bold',
                minWidth: { xs: 40, md: 'auto' }, // Mobile tombol kecil
                px: { xs: 1, md: 3 },
                '& span': { mr: { xs: 0, md: 1 } }, // Hack icon margin
                '& .MuiButton-startIcon': { mr: { xs: 0, md: 1 } }
              }}
            >
              {/* Teks disembunyikan di Mobile */}
              <Box component="span" sx={{ display: { xs: 'none', md: 'block' } }}>
                Konsultasi
              </Box>
            </Button>

          </Toolbar>
        </Container>
      </AppBar>

      {/* --- 2. BOTTOM NAVIGATION BAR (MOBILE ONLY) --- */}
      {/* Fixed di bawah layar, hanya muncul di layar kecil (xs/sm) */}
      <Paper 
        sx={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          display: { xs: 'block', md: 'none' }, // HIDE DI DESKTOP
          zIndex: 1300, // Pastikan di atas elemen lain
          borderTop: '1px solid rgba(0,0,0,0.1)',
          boxShadow: '0px -5px 20px rgba(0,0,0,0.05)'
        }} 
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={bottomNavValue}
          onChange={(_, newValue) => {
            setBottomNavValue(newValue);
            navigate(navItems[newValue].path); // Pindah halaman sesuai index
          }}
          sx={{
            height: 70, // Sedikit lebih tinggi agar nyaman disentuh
            '& .MuiBottomNavigationAction-root': {
              color: 'text.secondary',
              '&.Mui-selected': {
                color: 'primary.main',
              },
            },
          }}
        >
          {navItems.map((item) => (
            <BottomNavigationAction 
              key={item.label} 
              label={item.label} 
              icon={item.icon} 
              sx={{
                // Efek saat aktif: Icon sedikit membesar
                '&.Mui-selected svg': {
                  fontSize: 28,
                  transition: '0.2s'
                }
              }}
            />
          ))}
        </BottomNavigation>
      </Paper>
      
      {/* SPACER BOTTOM MOBILE */}
      {/* Menambah ruang kosong di bawah halaman agar konten paling bawah tidak tertutup Nav Bar */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, height: 70 }} />
    </>
  );
};

export default Navbar;