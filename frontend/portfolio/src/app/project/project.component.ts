import {Component, ElementRef, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { AlertComponent } from "../alert/alert.component";
import { FormsModule, NgForm } from "@angular/forms";
import { ProjectService } from "./project.service";
import { loadingSub } from "src/app/utils/utils";
import {UserProfile} from "../register/register.component";
import {NgOptimizedImage} from "@angular/common";
import {ImageUploadService} from "../common/image.service";
import {Observable, of} from "rxjs";
import {ToastService} from "../utils/toast-global/toast-service.service";
import {ToastsContainer} from "../utils/toast-global/toasts-container.component";

export interface Project {
  name: string;
  description: string;
  url: string;
  pictureUrl: string;
}

export interface ProjectMetadata {
  project: Project,
  userId: UserProfile
  projectId: string
}

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    AlertComponent,
    FormsModule,
    NgOptimizedImage,
    ToastsContainer
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit {

  protected project: Project = {} as Project;
  protected projectsMetadata: ProjectMetadata[] = [];
  protected projectImage: any = null;
  protected readonly URL = URL;
  @ViewChild('closeModal')
  protected closeModal: ElementRef | undefined;
  @ViewChild('successToast')
  protected successToastTemplate: any;
  @ViewChild('deleteToast')
  protected deleteToastTemplate: any;

  private toastService = inject(ToastService)
  private _currentUser: UserProfile;

  constructor (private pSvc: ProjectService, private iuSvc: ImageUploadService) {
    this._currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  ngOnInit(): void {
    loadingSub.next(true);
    this.getAll()
  }

  submit (ngForm: NgForm) {
    ngForm.form.markAllAsTouched();
    if(ngForm.valid) {
      let value: Project  = ngForm.value;
      this.uploadFile(this.projectImage).subscribe( result => {
        if(result) {
          value.pictureUrl = result;
        }
        this.showSuccess(this.successToastTemplate);
        this.pSvc.save(this._currentUser.id, value).then(result => {
          if(this.closeModal) {
            this.closeModal.nativeElement.click();
          }
          this.getAll();
        }).catch( error => console.log("Error"))
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
    return this.iuSvc.uploadImage(file, `/projects/${this._currentUser.id}/${this.projectsMetadata.length}`);
  }

  onFileChange(event: any) {
    this.projectImage = event?.target?.files[0];
  }

  delete(projectMetadata: ProjectMetadata) {
    this.pSvc.delete(projectMetadata).then(data => {
      this.getAll();
      this.showSuccess(this.deleteToastTemplate);
    })
  }

  private getAll(): void {
    this.pSvc.getAll(this._currentUser.id)
      .then(data => {
        this.projectsMetadata = Object.entries(data.val()).map(e => {
          return {
            project: <Project>e[1],
            userId: this._currentUser,
            projectId: e[0]
          }
        })
        console.log(this.projectsMetadata);
      })
      .finally(() => loadingSub.next(false));
  }

  showSuccess(template: TemplateRef<any>) {
    this.toastService.show({ template, classname: 'bg-success text-light', delay: 10000 });
  }
}


