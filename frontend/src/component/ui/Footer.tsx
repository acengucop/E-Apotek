import { Box, Container,Grid, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">Apotek Sehat</Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Melayani dengan hati untuk kesehatan masyarakat Indonesia.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">Kontak</Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>Jl. Jendral Sudirman No. 123</Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>Telp: (021) 1234-5678</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;