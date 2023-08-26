# tasks.py (you can create this in your app directory)

from celery import shared_task
from .models import Song

@shared_task
def save_song_to_db(song_data):
    print('WOOO song_data', song_data)
    song = Song(**song_data)
    song.save()
