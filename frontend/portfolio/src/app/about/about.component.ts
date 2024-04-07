import {Component, ElementRef, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";
import { AuthenticationService } from "../auth/authentication.service";
import { UserProfile } from "../register/register.component";
import { ImageUploadService } from "../common/image.service";
import {ToastService} from "../utils/toast-global/toast-service.service";
import {ToastsContainer} from "../utils/toast-global/toasts-container.component";

export interface UserAbout {
  title: string;
  description: string;
  photoUrl: string;
  technology: {
    backend: string;
    frontend: string;
  }
}


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FormsModule,
    ToastsContainer,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {

  protected userProfile: UserProfile ;
  @ViewChild('closeModal')
  protected closeModal: ElementRef | undefined;
  @ViewChild('successToast')
  protected successToastTemplate: any;

  private toastService = inject(ToastService);


  constructor (private authService: AuthenticationService, private iuSvc: ImageUploadService) {
    this.userProfile = {} as UserProfile;
    this.authService.userProfile.subscribe(userProfile => {
      if(userProfile) {
        this.userProfile = userProfile;
      }
    });
  }

  ngOnInit(): void { }

  uploadFile (event: any) {
    let file = event.target.files[0];
    if( file.size > 100000) {
      console.log("File is too big for upload");
    } else {
      // TODO set user key something
      this.iuSvc.uploadImage(file, `/profile-avatars/${this.userProfile.id}`).subscribe(
        data => {
          if(data) {
            this.userProfile.aboutUser.photoUrl = data;
            this.authService.updateUser(this.userProfile).subscribe(data => {
              this.showSuccess(this.successToastTemplate);
            });
          }
        }
      )
    }
  }

  submit (ngForm: NgForm) {
    ngForm.form.markAllAsTouched();
    if(ngForm.valid) {
      if(this.closeModal) {
        this.closeModal.nativeElement.click();
      }

      let value = ngForm.value;

      this.userProfile.aboutUser.description = value.description;
      this.userProfile.aboutUser.title = value.title;
      this.userProfile.aboutUser.technology.backend = value.backend;
      this.userProfile.aboutUser.technology.frontend = value.frontend;
      this.authService.updateUser(this.userProfile).subscribe( data => {
        this.showSuccess(this.successToastTemplate);
      })
    }
  }

  showSuccess(template: TemplateRef<any>) {
    this.toastService.show({ template, classname: 'bg-success text-light', delay: 10000 });
  }
}
