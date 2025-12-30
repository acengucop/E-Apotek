from rest_framework import viewsets, permissions
from .models import *
from .serializers import *

class SiteSettingViewSet(viewsets.ReadOnlyModelViewSet):
    """Hanya bisa dibaca oleh publik, edit lewat Django Admin"""
    queryset = SiteSetting.objects.all()
    serializer_class = SiteSettingSerializer

class HeroSlideViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HeroSlide.objects.filter(is_active=True)
    serializer_class = HeroSlideSerializer

class KategoriProdukViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = KategoriProduk.objects.all()
    serializer_class = KategoriProdukSerializer

class ProdukViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Produk.objects.all()
    serializer_class = ProdukSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        # Filter untuk menampilkan produk unggulan saja
        is_unggulan = self.request.query_params.get('is_unggulan')
        if is_unggulan == 'true':
            return queryset.filter(is_unggulan=True)
        return queryset

class LayananViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Layanan.objects.all()
    serializer_class = LayananSerializer

class TimApotekViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TimApotek.objects.all()
    serializer_class = TimApotekSerializer

class ArtikelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Artikel.objects.order_by('-tanggal_publikasi')
    serializer_class = ArtikelSerializer

class KontakPesanViewSet(viewsets.ModelViewSet):
    """Allow POST untuk publik (kirim pesan), Admin bisa lihat list"""
    queryset = KontakPesan.objects.all()
    serializer_class = KontakPesanSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]