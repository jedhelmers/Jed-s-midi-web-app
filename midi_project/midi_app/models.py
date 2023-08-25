from django.db import models
import uuid
# from rest_framework.mixins import CreateModelMixin
# from rest_framework.viewsets import GenericViewSet


class Song(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ip_address = models.GenericIPAddressField()
    date_created = models.DateTimeField(auto_now_add=True)
    midi_binary = models.BinaryField(blank=True, null=True)

    print('id', id)
    print('ip_address', ip_address)
    print('date_created', date_created)
    print('midi_binary', midi_binary)

# class SongViewSet(CreateModelMixin, GenericViewSet):
#     queryset = Song.objects.all()
#     serializer_class = SongSerializer
