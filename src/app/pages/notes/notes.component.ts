import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';
import { NoteEditorComponent } from '../../components/note-editor/note-editor.component';
import { NoteListComponent } from '../../components/note-list/note-list.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, NoteEditorComponent, NoteListComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {
  notes: Note[] = [];
  selectedNote: Note | null = null;

  constructor(private noteService: NoteService) {
    this.loadNotes();
  }

  loadNotes(): void {
    this.notes = this.noteService.getNotes();
  }

  handleSave(data: { title: string; content: string }): void {
    if (this.selectedNote) {
      this.noteService.updateNote(this.selectedNote.id, data.title, data.content);
      this.selectedNote = null;
    } else {
      this.noteService.addNote(data.title, data.content);
    }
    this.loadNotes();
  }

  handleEdit(note: Note): void {
    this.selectedNote = note;
  }

  handleDelete(id: number): void {
    this.noteService.deleteNote(id);
    if (this.selectedNote && this.selectedNote.id === id) {
      this.selectedNote = null;
    }
    this.loadNotes();
  }
}
