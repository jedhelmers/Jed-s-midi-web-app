from django.db import models
import uuid
# from rest_framework.mixins import CreateModelMixin
# from rest_framework.viewsets import GenericViewSet

class Note(models.Model):
    user_ip = models.GenericIPAddressField(protocol='both', unpack_ipv4=False)
    note = models.CharField(max_length=4)  # Example: "C#4"
    column_index = models.PositiveIntegerField()


    print('user_ip', user_ip)
    print('note', note)
    print('column_index', column_index)

    class Meta:
        unique_together = ('user_ip', 'note', 'column_index')


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

