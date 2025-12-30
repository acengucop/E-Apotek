import { Container, Card, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid'; 

import { ShoppingCart, VerifiedUser, AccessTime } from '@mui/icons-material';

const ServiceSection = () => {
  const services = [
    { icon: <VerifiedUser fontSize="large"/>, title: "Obat 100% Asli", desc: "Jaminan produk original langsung dari distributor." },
    { icon: <AccessTime fontSize="large"/>, title: "Layanan 24 Jam", desc: "Siap melayani kebutuhan darurat Anda kapan saja." },
    { icon: <ShoppingCart fontSize="large"/>, title: "Pesan Antar", desc: "Belanja dari rumah, kami antar sampai depan pintu." },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        {services.map((item, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, textAlign: 'center' }}>
              <Box sx={{ p: 2, bgcolor: 'primary.light', color: 'white', borderRadius: '50%', mb: 2 }}>
                {item.icon}
              </Box>
              <Typography variant="h6" gutterBottom>{item.title}</Typography>
              <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ServiceSection;