# midi_project/midi_app/tests/test_views.py

from django.test import Client, TestCase

class MidiViewTest(TestCase):

    def setUp(self):
        self.client = Client()

    def test_midi_endpoint(self):
        response = self.client.get('/midi_endpoint/')
        self.assertEqual(response.status_code, 200)
