import { getNotes, saveNotes } from './storage.js';
import { notesContainer } from './domElements.js';

export function renderNotes() {
  notesContainer.innerHTML = '';
  const notes = getNotes();
  notes.forEach(note => {
    const noteElement = createNoteElement(note);
    notesContainer.appendChild(noteElement);
  });
}

function createNoteElement(note) {
  const noteElement = document.createElement('div');
  noteElement.classList.add('note');
  if (note.completed) {
    noteElement.classList.add('completed');
  }

  const noteTitle = document.createElement('div');
  noteTitle.classList.add('note-title');
  noteTitle.textContent = note.title;

  const noteDescription = document.createElement('div');
  noteDescription.classList.add('note-description');
  noteDescription.textContent = note.description;
  noteDescription.addEventListener('click', () => {
    note.completed = !note.completed;
    saveNotes(getNotes().map(n => (n.id === note.id ? note : n)));
    renderNotes();
  });

  const noteActions = document.createElement('div');
  noteActions.classList.add('note-actions');

  const deleteButton = document.createElement('span');
  deleteButton.classList.add('delete');
  deleteButton.textContent = '🗑️';
  deleteButton.addEventListener('click', () => {
    saveNotes(getNotes().filter(n => n.id !== note.id));
    renderNotes();
  });

  noteActions.appendChild(deleteButton);
  noteElement.appendChild(noteTitle);
  noteElement.appendChild(noteDescription);
  noteElement.appendChild(noteActions);

  return noteElement;
}