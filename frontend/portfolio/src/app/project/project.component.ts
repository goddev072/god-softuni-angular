import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { AlertComponent } from "../alert/alert.component";
import { FormsModule, NgForm } from "@angular/forms";
import { ProjectService } from "./project.service";
import { loadingSub } from "src/app/utils/utils";
import {UserProfile} from "../register/register.component";
import {NgOptimizedImage} from "@angular/common";
import {ImageUploadService} from "../common/image.service";
import {Observable} from "rxjs";

export interface Project {
  name: string;
  description: string;
  url: string;
  pictureUrl: string;
}

export interface ProjectMetadata {
  projects: Project[],
  userId: string
}

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    AlertComponent,
    FormsModule,
    NgOptimizedImage
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit {

  protected project: Project = {} as Project;
  protected projects: Project[] = [];
  protected projectImage: any = null;
  protected readonly URL = URL;
  @ViewChild('closeModal')
  protected closeModal: ElementRef | undefined;

  private _currentUser: UserProfile;

  constructor (private pSvc: ProjectService, private iuSvc: ImageUploadService) {
    this._currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  ngOnInit(): void {
    loadingSub.next(true);
    this.pSvc.getAll(this._currentUser.id)
      .then(data => {
        this.projects = Object.values(data.val());
        console.log(this.projects);
      })
      .finally(() => loadingSub.next(false));


  }

  submit (ngForm: NgForm) {
    ngForm.form.markAllAsTouched();
    if(ngForm.valid) {
      let value: Project  = ngForm.value;
      this.uploadFile(this.projectImage).subscribe( result => {
        if(result) {
          value.pictureUrl = result;
        }
        this.pSvc.save(this._currentUser.id, value).then(result => {
          if(this.closeModal) {
            this.closeModal.nativeElement.click();
          }
        })
      })
    // this.uploadFile(this.projectImage);
    //   this.pSvc.saveMetadata({
    //     projects: this.projects,
    //     userId: this._currentUser.id
    //   } as ProjectMetadata);
    //   ngForm.reset();
    }
  }

  uploadFile(file: any): Observable<string | null> {
    return this.iuSvc.uploadImage(file, `/projects/${this._currentUser.id}/${this.projects.length}`);
  }

  onFileChange(event: any) {
    this.projectImage = event?.target?.files[0];
  }

}


