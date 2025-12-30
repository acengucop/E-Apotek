from rest_framework import serializers
from .models import *

class SiteSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSetting
        fields = '__all__'

class HeroSlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSlide
        fields = '__all__'

class KategoriProdukSerializer(serializers.ModelSerializer):
    class Meta:
        model = KategoriProduk
        fields = '__all__'

class ProdukSerializer(serializers.ModelSerializer):
    kategori_nama = serializers.CharField(source='kategori.nama', read_only=True)
    
    class Meta:
        model = Produk
        fields = '__all__'

class LayananSerializer(serializers.ModelSerializer):
    class Meta:
        model = Layanan
        fields = '__all__'

class TimApotekSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimApotek
        fields = '__all__'

class ArtikelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artikel
        fields = '__all__'

class KontakPesanSerializer(serializers.ModelSerializer):
    class Meta:
        model = KontakPesan
        fields = '__all__'