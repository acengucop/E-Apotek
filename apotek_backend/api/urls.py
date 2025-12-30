from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'settings', SiteSettingViewSet)
router.register(r'hero', HeroSlideViewSet)
router.register(r'kategori', KategoriProdukViewSet)
router.register(r'produk', ProdukViewSet)
router.register(r'layanan', LayananViewSet)
router.register(r'tim', TimApotekViewSet)
router.register(r'artikel', ArtikelViewSet)
router.register(r'kontak', KontakPesanViewSet)

urlpatterns = [
    path('', include(router.urls)),
]