import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private storageKey = 'my-notes';
  private notes: Note[] = [];
  private nextId = 1;

  constructor() {
    this.loadFromStorage();
  }

  getNotes(): Note[] {
    return [...this.notes];
  }

  getNoteById(id: number): Note | undefined {
    return this.notes.find(n => n.id === id);
  }

  addNote(title: string, content: string): Note {
    const now = new Date();
    const note: Note = {
      id: this.nextId++,
      title,
      content,
      createdAt: now,
      updatedAt: now
    };
    this.notes.unshift(note);
    this.saveToStorage();
    return note;
  }

  updateNote(id: number, title: string, content: string): void {
    const index = this.notes.findIndex(n => n.id === id);
    if (index !== -1) {
      this.notes[index] = {
        ...this.notes[index],
        title,
        content,
        updatedAt: new Date()
      };
      this.saveToStorage();
    }
  }

  deleteNote(id: number): void {
    this.notes = this.notes.filter(n => n.id !== id);
    this.saveToStorage();
  }

  private loadFromStorage(): void {
    const raw = localStorage.getItem(this.storageKey);
    if (raw) {
      const parsed: Note[] = JSON.parse(raw);
      this.notes = parsed.map(n => ({
        ...n,
        createdAt: new Date(n.createdAt),
        updatedAt: new Date(n.updatedAt)
      }));
      const maxId = this.notes.reduce((max, n) => n.id > max ? n.id : max, 0);
      this.nextId = maxId + 1;
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.notes));
  }
}
