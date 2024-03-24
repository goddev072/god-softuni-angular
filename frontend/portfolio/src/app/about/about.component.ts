import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";
import { AuthenticationService } from "../auth/authentication.service";
import { UserProfile } from "../register/register.component";
import { ImageUploadService } from "../common/image.service";

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
    FormsModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {

  protected userProfile: UserProfile ;


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
            this.authService.updateUser(this.userProfile);
          }
        }
      )
    }
  }

  submit (ngForm: NgForm) {
    ngForm.form.markAllAsTouched();
    if(ngForm.valid) {
    }
  }
}
