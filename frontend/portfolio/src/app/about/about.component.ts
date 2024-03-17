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

// title: 'I am a full stack software developer',
//   description: 'Currently I study Softuni Java path. I am passionate about software development. I catch every moment to develope my   skills. I have experiance with Java technology for backend and Angular for frontned. I am familiar with databases relational and no     relational.\n' +
// 'I am really for self development. When I am not working I like to read book tech and non tech. When I have time I like to play with electronic and iot stuff. On my weekends I like hiking on the mountain, this makes me feel relaxed and full of energy. Also sport every day to be in good health!',
//   photoUrl: '',
//   technology: {
//   backend: 'Java',
//     frontend: 'Angular'
// }
// console.log(data);
// if(data) {
//   data.aboutUser = this.userAbout;
//   authService.updateUser(data).subscribe(() => console.log("user updated successfully"));
