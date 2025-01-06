import { noteForm, noteTitleInput, noteDescriptionInput, cancelButton } from './domElements.js';
import { getNotes, saveNotes } from './storage.js';
import { renderNotes } from './notes.js';

document.addEventListener('DOMContentLoaded', () => {
  renderNotes();
});

noteForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = noteTitleInput.value;
  const description = noteDescriptionInput.value;

  const newNote = {
    id: Date.now(),
    title,
    description,
    completed: false
  };

  const notes = getNotes();
  notes.unshift(newNote);
  saveNotes(notes);
  renderNotes();

  noteForm.reset();
  cancelButton.style.display = 'none';
});

noteDescriptionInput.addEventListener('focus', () => {
  cancelButton.style.display = 'block';
});

cancelButton.addEventListener('click', () => {
  noteForm.reset();
  cancelButton.style.display = 'none';
});