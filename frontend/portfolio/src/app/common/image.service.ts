import { Injectable } from "@angular/core";
import { from, Observable, of, switchMap } from "rxjs";

import { AngularFireStorage } from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {

  constructor(private storage: AngularFireStorage) {}

  uploadImage(image: File, path: string): Observable<string | null> {
    const file = image;
    const filePath = path;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);;

    return task.snapshotChanges().pipe(
      switchMap( data => {
        if(data) {
          return from(data.ref.getDownloadURL());
        }
        return of(null);
      })
    );
  }
}
