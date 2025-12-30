import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

// Import Komponen UI Global
import Navbar from './component/ui/Navbar';
import Footer from './component/ui/Footer';

// Import Halaman
import Home from './component/pages/home';
// Ubah alias menjadi PascalCase (DetailProduk) agar bisa dipakai sebagai Component React
import DetailProduk from './component/pages/DetailProduk'; 
import Kontak from './component/pages/Kontak';
import Layanan from './component/pages/Layanan';
import Produk from './component/pages/Produk';



function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Navbar selalu muncul di atas */}
        <Navbar /> 
        
        {/* Area konten yang berubah-ubah sesuai URL */}
        <Box sx={{ flexGrow: 1 }}>
          <Routes>
            {/* 1. Beranda */}
            <Route path="/" element={<Home />} />

            {/* 2. Katalog Produk (Semua Produk) */}
            <Route path="/produk" element={<Produk />} />

            {/* 3. Detail Produk 
                Menggunakan ":id" sebagai parameter dinamis.
                Contoh URL: /produk/1 atau /produk/15 
            */}
            <Route path="/produk/:id" element={<DetailProduk />} />

            {/* 4. Layanan */}
            <Route path="/layanan" element={<Layanan />} />

            {/* 5. Kontak */}
            <Route path="/kontak" element={<Kontak />} />
          </Routes>
        </Box>

        {/* Footer selalu muncul di bawah */}
        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default App;