from django.apps import AppConfig

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'  # Pastikan ini sesuai dengan nama folder aplikasi Anda
    verbose_name = 'Manajemen Apotek'  # Nama ini akan muncul di Header Admin Panel

    def ready(self):
        # Tempat untuk import signals jika nanti dibutuhkan
        pass