import { Injectable } from '@angular/core';
import { AbstractService } from "../common/abstract.service";
import {Project, ProjectMetadata} from "./project.component";
import { DataSnapshot } from "@angular/fire/compat/database/interfaces";
import firebase from "firebase/compat";
import {ICrudService} from "../utils/crud.service.interface";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends AbstractService implements ICrudService<Project> {

  private _urlPath = '/projects/'

  constructor() {
    super();
  }

  getById(id: string): Observable<Project> {
        throw new Error('Method not implemented.');
    }
  getByName(name: string): Observable<Project> {
      throw new Error('Method not implemented.');
  }
  getList(): Observable<Project[]> {
      throw new Error('Method not implemented.');
  }
  deleteById(id: string, userId: string): Observable<void> {
      throw new Error('Method not implemented.');
  }

  saveMetadata(projectMetadata: ProjectMetadata): Promise<void> {
    return this.database.database.ref(this._urlPath + projectMetadata.userId).set(projectMetadata.project);
  }

  save(userId: string, project: Project) {
    var p = this.database.list(this._urlPath + userId).push(project);
    return p;
  }

  getAll(userId: string): Promise<DataSnapshot> {
    return this.database.list(this._urlPath + userId).query.get();
  }

  delete(projectMetadata: ProjectMetadata): Promise<void> {
   var r = this.database.list(this._urlPath + `${projectMetadata.userId.id}/${projectMetadata.projectId}`).remove();
   return r;
  }
}
