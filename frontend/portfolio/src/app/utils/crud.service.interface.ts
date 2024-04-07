import {Observable} from "rxjs";

export interface ICrudService<T> {

  getById(id: string): Observable<T>;
  getByName(name: string): Observable<T>;
  getList(): Observable<T[]>;
  deleteById(id: string, userId: string): Observable<void>;
  save(userId: string, data: any): void;
}
