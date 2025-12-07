import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-editor.component.html',
  styleUrl: './note-editor.component.scss'
})
export class NoteEditorComponent {
  @Input() selectedNote: Note | null = null;
  @Output() save = new EventEmitter<{ title: string; content: string }>();

  title = '';
  content = '';

  ngOnChanges(): void {
    if (this.selectedNote) {
      this.title = this.selectedNote.title;
      this.content = this.selectedNote.content;
    } else {
      this.title = '';
      this.content = '';
    }
  }

  onSubmit(): void {
    if (!this.title.trim() && !this.content.trim()) {
      return;
    }
    this.save.emit({ title: this.title.trim(), content: this.content.trim() });
    if (!this.selectedNote) {
      this.title = '';
      this.content = '';
    }
  }

  clearSelection(): void {
    this.selectedNote = null;
    this.title = '';
    this.content = '';
  }
}
