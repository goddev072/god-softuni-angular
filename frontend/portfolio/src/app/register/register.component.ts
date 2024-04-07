import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { RegisterService } from './register.service';
import { UserAbout } from "../about/about.component";

export interface UserProfile {
  id: string;
  firstName: string,
  lastName: string,
  address: string,
  phoneNumber: string,
  dateOfBirth: Date,
  email: string,
  aboutUser: UserAbout
}

export interface RegisterUser extends UserProfile {
  password: string,
  confirmPassword: string,
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ FormsModule, JsonPipe ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [ AngularFireDatabase ]
})
export class RegisterComponent {

  protected user: RegisterUser = {} as RegisterUser;
  protected termsAndConditions: boolean = true;

  constructor(private rSvc: RegisterService) {}

  protected submit(ngForm: NgForm) {
    ngForm.form.markAllAsTouched();
    if(ngForm.valid) {
      this.rSvc.doRegister(this.user);
    }
  }

  protected updateTermsAndConditions(event: boolean) {
    this.termsAndConditions = event
  }
}
