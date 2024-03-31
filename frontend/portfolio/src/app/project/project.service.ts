import { Injectable } from '@angular/core';
import { AbstractService } from "../common/abstract.service";
import {Project, ProjectMetadata} from "./project.component";
import { DataSnapshot } from "@angular/fire/compat/database/interfaces";

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends AbstractService {

  private _urlPath = '/projects/'

  constructor() {
    super();
  }



  saveMetadata(projectMetadata: ProjectMetadata): Promise<void> {
    return this.database.database.ref(this._urlPath + projectMetadata.userId).set(projectMetadata.projects);
  }

  save(userId: string, project: Project) {
    var p = this.database.list(this._urlPath + userId).push(project);
    return p;
  }

  getAll(userId: string): Promise<DataSnapshot> {
    return this.database.list(this._urlPath + userId).query.get();
  }

}
