import axios from 'axios';

// --- KONFIGURASI DASAR ---
// Ganti URL ini jika nanti sudah di-hosting
const API_URL = 'http://localhost:8000/api'; 

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- TYPE DEFINITIONS (Sesuai Models Django) ---

export interface SiteSetting {
  id: number;
  nama_apotek: string;
  logo: string | null;
  alamat: string;
  no_telepon: string;
  email: string;
  deskripsi_footer: string;
}

export interface HeroSlide {
  id: number;
  judul: string;
  sub_judul: string;
  gambar: string;
  is_active: boolean;
}

export interface KategoriProduk {
  id: number;
  nama: string;
}

export interface Produk {
  id: number;
  kategori: number;
  kategori_nama: string; // Field tambahan dari serializer
  nama: string;
  harga: number; // Decimal di Django jadi number/string di JS
  gambar: string;
  deskripsi: string;
  is_unggulan: boolean;
  created_at: string;
}

export interface Layanan {
  id: number;
  nama_layanan: string;
  icon: string;
  deskripsi_singkat: string;
}

export interface TimApotek {
  id: number;
  nama: string;
  posisi: string;
  foto: string;
  bio: string;
}

export interface Artikel {
  id: number;
  judul: string;
  slug: string;
  gambar: string;
  isi: string;
  tanggal_publikasi: string;
}

export interface KontakForm {
  nama: string;
  email: string;
  pesan: string;
}

// --- API ENDPOINTS ---

export const api = {
  // 1. Settings (Footer, Logo, Kontak Info)
  getSettings: async () => {
    // Karena biasanya settings cuma 1 row, kita ambil array index 0 atau list
    const response = await apiClient.get<SiteSetting[]>('/settings/');
    return response.data;
  },

  // 2. Hero Section
  getHeroSlides: async () => {
    const response = await apiClient.get<HeroSlide[]>('/hero/');
    return response.data;
  },

  // 3. Produk & Kategori
  getCategories: async () => {
    const response = await apiClient.get<KategoriProduk[]>('/kategori/');
    return response.data;
  },

  getProducts: async (isUnggulan?: boolean) => {
    const params = isUnggulan ? { is_unggulan: 'true' } : {};
    const response = await apiClient.get<Produk[]>('/produk/', { params });
    return response.data;
  },

  getProductDetail: async (id: number) => {
    const response = await apiClient.get<Produk>(`/produk/${id}/`);
    return response.data;
  },

  // 4. Layanan
  getServices: async () => {
    const response = await apiClient.get<Layanan[]>('/layanan/');
    return response.data;
  },

  // 5. Tim / Tentang Kami
  getTeam: async () => {
    const response = await apiClient.get<TimApotek[]>('/tim/');
    return response.data;
  },

  // 6. Artikel / Berita
  getArticles: async () => {
    const response = await apiClient.get<Artikel[]>('/artikel/');
    return response.data;
  },

  getArticleDetail: async (id: number) => {
    const response = await apiClient.get<Artikel>(`/artikel/${id}/`);
    return response.data;
  },

  // 7. Kontak (POST)
  sendContactMessage: async (data: KontakForm) => {
    const response = await apiClient.post('/kontak/', data);
    return response.data;
  },
};

export default api;