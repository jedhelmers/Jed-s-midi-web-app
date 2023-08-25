from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import Song
from .serializers import SongSerializer, MidiUpdateSerializer

@api_view(['POST'])
def song_view(request):
    if request.method == "POST":
        serializer = SongSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@api_view(['PUT'])
def update_midi_view(request):
    try:
        song = Song.objects.get(id=request.data.get('id'))
    except Song.DoesNotExist:
        return JsonResponse({'error': 'Song not found.'}, status=404)

    serializer = MidiUpdateSerializer(song, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data)
    return JsonResponse(serializer.errors, status=400)
