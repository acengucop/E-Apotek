from django.contrib import admin
from django.utils.html import mark_safe
from django.db.models import Count
from .models import (
    SiteSetting, HeroSlide, KategoriProduk, Produk, 
    Layanan, TimApotek, Artikel, KontakPesan
)

# Konfigurasi Header Admin Panel
admin.site.site_header = "Admin Apotek Sehat"
admin.site.site_title = "Portal Admin Apotek"
admin.site.index_title = "Selamat Datang di Dashboard Pengelola"

@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    list_display = ('nama_apotek', 'no_telepon', 'email')
    
    # Mencegah admin menambah lebih dari 1 pengaturan (Singleton)
    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)

@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display = ('thumbnail', 'judul', 'is_active')
    list_editable = ('is_active',) 
    list_display_links = ('judul',)

    # Menampilkan gambar asli (thumbnail) bukan cuma nama file
    def thumbnail(self, obj):
        if obj.gambar:
            return mark_safe(f'<img src="{obj.gambar.url}" width="100" style="border-radius:5px;" />')
        return "No Image"
    thumbnail.short_description = 'Preview'

@admin.register(KategoriProduk)
class KategoriProdukAdmin(admin.ModelAdmin):
    list_display = ('nama', 'jumlah_produk_count')
    search_fields = ('nama',)

    # Optimasi Query: Menghitung jumlah produk tanpa membebani database berulang kali
    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset.annotate(jumlah_produk=Count('produk'))

    def jumlah_produk_count(self, obj):
        return obj.jumlah_produk
    jumlah_produk_count.short_description = 'Total Produk'
    jumlah_produk_count.admin_order_field = 'jumlah_produk'

@admin.register(Produk)
class ProdukAdmin(admin.ModelAdmin):
    # PERBAIKAN PENTING: 'harga' harus ada di list_display karena ada di list_editable
    list_display = ('nama', 'kategori', 'harga', 'is_unggulan', 'created_at')
    
    list_filter = ('kategori', 'is_unggulan', 'created_at')
    search_fields = ('nama', 'deskripsi')
    
    # Fitur edit cepat langsung dari tabel
    list_editable = ('harga', 'is_unggulan') 
    
    list_per_page = 20
    date_hierarchy = 'created_at'

@admin.register(Layanan)
class LayananAdmin(admin.ModelAdmin):
    list_display = ('icon_preview', 'nama_layanan', 'deskripsi_singkat')
    
    def icon_preview(self, obj):
        if obj.icon:
            return mark_safe(f'<img src="{obj.icon.url}" width="30" />')
        return "-"
    icon_preview.short_description = 'Icon'

@admin.register(TimApotek)
class TimApotekAdmin(admin.ModelAdmin):
    list_display = ('foto_preview', 'nama', 'posisi')

    def foto_preview(self, obj):
        if obj.foto:
            return mark_safe(f'<img src="{obj.foto.url}" width="50" style="border-radius:50%;" />')
        return "-"
    foto_preview.short_description = 'Foto'

@admin.register(Artikel)
class ArtikelAdmin(admin.ModelAdmin):
    list_display = ('judul', 'tanggal_publikasi')
    prepopulated_fields = {'slug': ('judul',)} 
    search_fields = ('judul', 'isi')
    date_hierarchy = 'tanggal_publikasi'

@admin.register(KontakPesan)
class KontakPesanAdmin(admin.ModelAdmin):
    list_display = ('nama', 'email', 'tanggal_kirim')
    readonly_fields = ('nama', 'email', 'pesan', 'tanggal_kirim') 
    search_fields = ('nama', 'email', 'pesan')
    list_filter = ('tanggal_kirim',)
    ordering = ('-tanggal_kirim',) # Pesan terbaru paling atas