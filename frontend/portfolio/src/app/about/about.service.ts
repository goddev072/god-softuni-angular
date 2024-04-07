import { Injectable } from '@angular/core';
import {ICrudService} from "../utils/crud.service.interface";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService implements ICrudService<any> {

  constructor() {
  }

  getById(id: string): Observable<any> {
        throw new Error('Method not implemented.');
  }
  getByName(name: string): Observable<any> {
      throw new Error('Method not implemented.');
  }
  getList(): Observable<any[]> {
      throw new Error('Method not implemented.');
  }
  deleteById(id: string, userId: string): Observable<void> {
      throw new Error('Method not implemented.');
  }
  save(userId: string, data: any): void {
      throw new Error('Method not implemented.');
  }
}
