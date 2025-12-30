from django.db import models

class SiteSetting(models.Model):
    """Pengaturan umum website (Logo, Nama, Kontak Footer)"""
    nama_apotek = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='site/', null=True, blank=True)
    alamat = models.TextField()
    no_telepon = models.CharField(max_length=20)
    email = models.EmailField()
    deskripsi_footer = models.TextField(help_text="Teks singkat di footer")
    
    def __str__(self):
        return self.nama_apotek

class HeroSlide(models.Model):
    """Slider/Banner di Halaman Utama"""
    judul = models.CharField(max_length=100)
    sub_judul = models.TextField(blank=True)
    gambar = models.ImageField(upload_to='hero/')
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.judul

class KategoriProduk(models.Model):
    nama = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nama

class Produk(models.Model):
    kategori = models.ForeignKey(KategoriProduk, on_delete=models.CASCADE, related_name='produk')
    nama = models.CharField(max_length=200)
    harga = models.DecimalField(max_digits=12, decimal_places=0)
    gambar = models.ImageField(upload_to='produk/')
    deskripsi = models.TextField()
    is_unggulan = models.BooleanField(default=False, help_text="Centang jika ingin tampil di halaman depan")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nama

class Layanan(models.Model):
    nama_layanan = models.CharField(max_length=100)
    icon = models.ImageField(upload_to='layanan/', help_text="Upload ikon SVG/PNG")
    deskripsi_singkat = models.TextField()
    
    def __str__(self):
        return self.nama_layanan

class TimApotek(models.Model):
    nama = models.CharField(max_length=100)
    posisi = models.CharField(max_length=100)
    foto = models.ImageField(upload_to='tim/')
    bio = models.TextField(blank=True)
    
    def __str__(self):
        return self.nama

class Artikel(models.Model):
    judul = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    gambar = models.ImageField(upload_to='artikel/')
    isi = models.TextField()
    tanggal_publikasi = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.judul

class KontakPesan(models.Model):
    nama = models.CharField(max_length=100)
    email = models.EmailField()
    pesan = models.TextField()
    tanggal_kirim = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Pesan dari {self.nama}"