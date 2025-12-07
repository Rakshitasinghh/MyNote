import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../../models/note.model';
import { NoteCardComponent } from '../note-card/note-card.component';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, NoteCardComponent],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
})
export class NoteListComponent {
  @Input() notes: Note[] = [];
  @Output() edit = new EventEmitter<Note>();
  @Output() delete = new EventEmitter<number>();

  onEdit(note: Note): void {
    this.edit.emit(note);
  }

  onDelete(id: number): void {
    this.delete.emit(id);
  }
}
