# midi_project/midi_app/tests/test_models.py

from django.test import TestCase
from midi_app.models import MidiFile

class MidiFileModelTest(TestCase):

    def test_string_representation(self):
        midi = MidiFile(name="TestMidi")
        self.assertEqual(str(midi), midi.name)

