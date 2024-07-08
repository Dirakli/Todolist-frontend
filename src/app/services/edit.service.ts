import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditStateService {
  private editIndexSubject = new BehaviorSubject<number | undefined>(undefined);
  editIndex$ = this.editIndexSubject.asObservable();

  setEditIndex(index: number | undefined): void {
    this.editIndexSubject.next(index);
  }
}
