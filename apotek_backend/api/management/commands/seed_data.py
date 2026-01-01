import random
from io import BytesIO
from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from django.utils.text import slugify
from PIL import Image, ImageDraw, ImageFont

# Import model dari aplikasi Anda
from api.models import (
    SiteSetting, HeroSlide, KategoriProduk, Produk, 
    Layanan, TimApotek, Artikel, KontakPesan
)

class Command(BaseCommand):
    help = 'Mengisi database dengan data dummy Apotek Indonesia'

    def create_image(self, title, color='blue', size=(800, 600)):
        """Fungsi helper untuk membuat file gambar dummy on-the-fly"""
        image = Image.new('RGB', size, color)
        draw = ImageDraw.Draw(image)
        # Mencoba load font default, jika gagal pakai default bitmap
        try:
            # Menggambar kotak teks sederhana
            pass 
        except:
            pass
        
        buffer = BytesIO()
        image.save(buffer, format='JPEG')
        return ContentFile(buffer.getvalue(), name=f"{slugify(title)}.jpg")

    def handle(self, *args, **kwargs):
        self.stdout.write('Menghapus data lama...')
        # Hapus data lama agar tidak duplikat (Opsional)
        Produk.objects.all().delete()
        KategoriProduk.objects.all().delete()
        HeroSlide.objects.all().delete()
        Layanan.objects.all().delete()
        TimApotek.objects.all().delete()
        Artikel.objects.all().delete()
        SiteSetting.objects.all().delete()

        self.stdout.write('Membuat Site Settings...')
        SiteSetting.objects.create(
            nama_apotek="Apotek Menara Keluarga",
            alamat="Jl. Jendral Sudirman No. 45, Pekanbaru, Riau",
            no_telepon="+62 812-3456-7890",
            email="info@apoteksehat.id",
            deskripsi_footer="Melayani kebutuhan kesehatan keluarga Anda dengan sepenuh hati. Obat asli, harga terjangkau, dan layanan apoteker profesional.",
            logo=self.create_image("logo_apotek", color="#059669", size=(200, 200))
        )

        self.stdout.write('Membuat Hero Slides...')
        slides_data = [
            ("Diskon Vitamin 20%", "Jaga Imun Tubuh di Musim Hujan", "#10b981"),
            ("Layanan Antar Obat", "Pesan dari WhatsApp, Kami Antar ke Rumah", "#0ea5e9"),
            ("Gratis Cek Tensi", "Khusus Lansia Setiap Hari Jumat", "#f59e0b"),
        ]
        for judul, sub, color in slides_data:
            HeroSlide.objects.create(
                judul=judul,
                sub_judul=sub,
                gambar=self.create_image(judul, color=color, size=(1200, 500)),
                is_active=True
            )

        self.stdout.write('Membuat Kategori & Produk...')
        kategori_map = {
            "Obat Bebas": ["Paracetamol 500mg", "Obat Batuk Sirup", "Minyak Kayu Putih"],
            "Vitamin & Suplemen": ["Vitamin C 1000mg", "Vitamin D3", "Madu Murni", "Suplemen Zinc"],
            "Ibu & Anak": ["Susu Formula Bayi", "Minyak Telon", "Bedak Bayi", "Popok Bayi"],
            "Alat Kesehatan": ["Termometer Digital", "Masker Medis 3 Ply", "Oximeter", "Perban"],
            "Obat Resep": ["Amoxicillin 500mg", "Asam Mefenamat", "Cefadroxil"]
        }

        colors = ['#ef4444', '#f97316', '#84cc16', '#06b6d4', '#8b5cf6']
        
        for i, (kat_nama, prods) in enumerate(kategori_map.items()):
            kategori = KategoriProduk.objects.create(nama=kat_nama)
            
            for prod_nama in prods:
                harga = random.randint(5, 150) * 1000 # Harga random 5rb - 150rb
                Produk.objects.create(
                    kategori=kategori,
                    nama=prod_nama,
                    harga=harga,
                    deskripsi=f"Deskripsi lengkap untuk {prod_nama}. Produk ini sangat berkualitas dan dijamin keasliannya. Simpan di tempat sejuk dan kering.",
                    gambar=self.create_image(prod_nama, color=random.choice(colors), size=(400, 400)),
                    is_unggulan=random.choice([True, False])
                )

        self.stdout.write('Membuat Layanan...')
        layanan_data = [
            ("Resep Dokter", "Layanan penebusan resep dokter dengan pengecekan interaksi obat."),
            ("Konsultasi Apoteker", "Konsultasi gratis mengenai penggunaan obat yang benar."),
            ("Cek Kesehatan", "Cek gula darah, kolesterol, dan asam urat instan."),
            ("Home Delivery", "Layanan antar obat cepat untuk radius 5km.")
        ]
        for nama, desc in layanan_data:
            Layanan.objects.create(
                nama_layanan=nama,
                deskripsi_singkat=desc,
                icon=self.create_image(nama, color="#6366f1", size=(100, 100))
            )

        self.stdout.write('Membuat Tim Apotek...')
        tim_data = [
            ("Apt. Budi Santoso, S.Farm", "Apoteker Penanggung Jawab", "Lulusan Universitas Indonesia dengan pengalaman 10 tahun."),
            ("Siti Aminah, A.Md.Farm", "Asisten Apoteker", "Ahli dalam meracik obat dan pelayanan pasien."),
            ("Rudi Hermawan", "Staff Logistik", "Memastikan ketersediaan stok obat selalu aman.")
        ]
        for nama, posisi, bio in tim_data:
            TimApotek.objects.create(
                nama=nama,
                posisi=posisi,
                bio=bio,
                foto=self.create_image(nama, color="#8b5cf6", size=(300, 300))
            )

        self.stdout.write('Membuat Artikel...')
        artikel_data = [
            ("5 Cara Menjaga Imun Saat Pancaroba", "Tips kesehatan untuk menghadapi perubahan cuaca..."),
            ("Bahaya Minum Antibiotik Tanpa Resep", "Antibiotik bukan obat sembarangan, simak bahayanya..."),
            ("Manfaat Vitamin C untuk Kulit", "Selain untuk imun, vitamin C juga bagus untuk kolagen..."),
        ]
        for judul, isi in artikel_data:
            Artikel.objects.create(
                judul=judul,
                slug=slugify(judul),
                isi=isi + " " + "Lorem ipsum dolor sit amet " * 20,
                gambar=self.create_image(judul, color="#ec4899", size=(800, 400))
            )
        
        self.stdout.write(self.style.SUCCESS('Selesai! Data dummy berhasil dibuat.'))