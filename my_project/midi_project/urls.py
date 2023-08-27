from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from django.urls import re_path
from django.views.generic import TemplateView
import midi_app.views as views

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', views.CustomTemplateView(template_name="index.html")),
    path('', views.CustomTemplateView.as_view(), name='home'),
    path('api/addNote', views.add_note, name='add_note'),
    path('api/saveSong', views.save_song, name='save_song'),
    path('api/removenote', views.remove_note, name='remove_note'),
    path('api/songs/', views.song_view, name='song_view'),
    path('api/songs/update-midi/', views.update_midi_view, name='update_midi_view'),
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]


if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])