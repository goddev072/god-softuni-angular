import { inject } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/compat/database';

export abstract class AbstractService {

   private _nextId: number = 0;
   private _database: AngularFireDatabase = inject(AngularFireDatabase);

   protected readonly suffixDatabaseUrl = ".json"

   get database() {
      return this._database;
   }

   get nextId() {
     return this._nextId;
   }

   constructor() {}
}
