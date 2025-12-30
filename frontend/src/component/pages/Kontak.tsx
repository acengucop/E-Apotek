import React, { useState } from 'react';
import { 
  Box, Container, Typography, TextField, Button, Paper, 
  Snackbar, Alert, IconButton
} from '@mui/material';

// FIX: Import Grid Universal
import Grid from '@mui/material/Grid';

// FIX: Direct Import Icons
import LocationOn from '@mui/icons-material/LocationOn';
import Phone from '@mui/icons-material/Phone';
import Email from '@mui/icons-material/Email';
import AccessTime from '@mui/icons-material/AccessTime';
import Send from '@mui/icons-material/Send';
import Close from '@mui/icons-material/Close';

import { api, type KontakForm } from '../../lib/api';

const KontakPage = () => {
  // --- STATE ---
  const [formData, setFormData] = useState<KontakForm>({
    nama: '',
    email: '',
    pesan: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{open: boolean, type: 'success' | 'error', message: string}>({
    open: false, type: 'success', message: ''
  });

  // --- HANDLERS ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Panggil API Backend Django
      await api.sendContactMessage(formData);
      
      // Reset Form & Tampilkan Sukses
      setFormData({ nama: '', email: '', pesan: '' });
      setNotification({ open: true, type: 'success', message: 'Pesan berhasil dikirim! Kami akan segera menghubungi Anda.' });
    } catch (error) {
      console.error(error);
      setNotification({ open: true, type: 'error', message: 'Gagal mengirim pesan. Silakan coba lagi.' });
    } finally {
      setLoading(false);
    }
  };

  // List Info Kontak Static
  const contactInfo = [
    { 
      icon: <LocationOn fontSize="large" sx={{ color: '#059669' }} />, 
      title: "Alamat Apotek", 
      desc: "Jl. Jendral Sudirman No. 123, Pekanbaru, Riau, Indonesia" 
    },
    { 
      icon: <Phone fontSize="large" sx={{ color: '#059669' }} />, 
      title: "Telepon / WA", 
      desc: "+62 812-3456-7890",
      action: () => window.open('https://wa.me/6281234567890', '_blank')
    },
    { 
      icon: <Email fontSize="large" sx={{ color: '#059669' }} />, 
      title: "Email", 
      desc: "info@apoteksehat.com",
      action: () => window.location.href = 'mailto:info@apoteksehat.com'
    },
    { 
      icon: <AccessTime fontSize="large" sx={{ color: '#059669' }} />, 
      title: "Jam Operasional", 
      desc: "Senin - Minggu: 08.00 - 22.00 WIB" 
    },
  ];

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh' }}>
      
      {/* 1. HERO HEADER */}
      <Box sx={{ bgcolor: '#1e293b', py: 8, color: 'white', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Hubungi Kami
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.8, fontWeight: 400 }}>
            Punya pertanyaan tentang obat atau layanan? Tim apoteker kami siap membantu Anda.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          
          {/* 2. KOLOM KIRI: INFO KONTAK */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 4, color: 'primary.main' }}>
              Informasi Kontak
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {contactInfo.map((item, index) => (
                <Paper 
                  key={index} 
                  elevation={0}
                  onClick={item.action} // Klik utk WA/Email
                  sx={{ 
                    p: 3, 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: 3, 
                    borderRadius: 4,
                    border: '1px solid #e2e8f0',
                    cursor: item.action ? 'pointer' : 'default',
                    transition: 'all 0.3s',
                    '&:hover': { 
                      transform: 'translateX(5px)', 
                      borderColor: '#10b981',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)' 
                    }
                  }}
                >
                  <Box sx={{ bgcolor: '#f0fdf4', p: 1.5, borderRadius: '50%' }}>
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.desc}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Grid>

          {/* 3. KOLOM KANAN: FORMULIR */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 3, md: 5 }, 
                borderRadius: 4, 
                border: '1px solid #e2e8f0',
                bgcolor: 'white'
              }}
            >
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                Kirim Pesan
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Isi formulir di bawah ini, kami akan membalas via email secepatnya.
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <TextField 
                      fullWidth 
                      label="Nama Lengkap" 
                      name="nama"
                      value={formData.nama}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField 
                      fullWidth 
                      label="Alamat Email" 
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField 
                      fullWidth 
                      label="Pesan / Pertanyaan" 
                      name="pesan"
                      multiline
                      rows={5}
                      value={formData.pesan}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      size="large" 
                      fullWidth
                      disabled={loading}
                      endIcon={loading ? null : <Send />}
                      sx={{ 
                        py: 1.5, 
                        borderRadius: 2, 
                        bgcolor: '#059669',
                        fontWeight: 'bold',
                        '&:hover': { bgcolor: '#047857' } 
                      }}
                    >
                      {loading ? 'Mengirim...' : 'Kirim Pesan'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>

          {/* 4. MAPS EMBED */}
          <Grid size={{ xs: 12 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 1, 
                borderRadius: 4, 
                border: '1px solid #e2e8f0', 
                height: 400, 
                overflow: 'hidden' 
              }}
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.691763162705!2d101.4452073749646!3d0.4566735995392264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5a8f79d107873%3A0x6291a82f3c7e7d99!2sUniversitas%20Muhammadiyah%20Riau%20(Kampus%20Utama)!5e0!3m2!1sid!2sid!4v1714570000000!5m2!1sid!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '12px' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Paper>
          </Grid>

        </Grid>
      </Container>

      {/* NOTIFIKASI SUKSES / ERROR */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setNotification({ ...notification, open: false })} 
          severity={notification.type} 
          sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}
          variant="filled"
          action={
            <IconButton size="small" color="inherit" onClick={() => setNotification({ ...notification, open: false })}>
              <Close fontSize="small" />
            </IconButton>
          }
        >
          {notification.message}
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default KontakPage;
