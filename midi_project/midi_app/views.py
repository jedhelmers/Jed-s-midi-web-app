from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from rest_framework.decorators import api_view
from .models import Note
from .models import Song
from .tasks import save_song_to_db

import json
from .serializers import SongSerializer, MidiUpdateSerializer


from django.http import JsonResponse

@require_POST
def save_song(request):
    data = json.loads(request.body)
    song_data = data.get('song_data')
    print('song_data', song_data)

    if song_data:
        print('WEEE!')
        save_song_to_db.delay(song_data)
        # save song logic
        return JsonResponse({"status": "success"})
    else:
        print('BOOOOO')
        return JsonResponse({"status": "error", "message": "Invalid data"})


@require_POST
def save_song(request):
    data = json.loads(request.body)
    song_data = data.get('song_data')

    if song_data:
        save_song_to_db.delay(song_data)  # This sends the task to RabbitMQ
        return JsonResponse({"status": "success"})
    else:
        return JsonResponse({"status": "error", "message": "Invalid data"})


@csrf_exempt
def remove_note(request):
    if request.method == "POST":
        user_ip = get_client_ip(request)
        note = request.POST.get('note')
        column_index = request.POST.get('column')

        try:
            note_instance = Note.objects.get(user_ip=user_ip, note=note, column_index=column_index)
            note_instance.delete()

            return JsonResponse({'success': True})

        except Note.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Note not found'})

@csrf_exempt
def add_note(request):
    if request.method == "POST":
        user_ip = get_client_ip(request)
        note = request.POST.get('note')
        column_index = request.POST.get('column')

        # Check if note already exists for that user in the specified column
        existing_note = Note.objects.filter(user_ip=user_ip, note=note, column_index=column_index)

        if existing_note.exists():
            return JsonResponse({'success': False, 'error': 'Note already exists'})

        # If not, create and save the new note
        new_note = Note(user_ip=user_ip, note=note, column_index=column_index)
        new_note.save()

        return JsonResponse({'success': True})

    return JsonResponse({'success': False, 'error': 'Invalid request method'})

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

@csrf_exempt
@api_view(['POST'])
def song_view(request):
    print('\nrequest', request)
    if request.method == "POST":
        serializer = SongSerializer(data=request.data)
        print('serializer', serializer)
        print('request.data', request.data)
        print('serializer.is_valid()', serializer.is_valid())
        if serializer.is_valid():
            print('serializer.data', serializer.data)
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
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
