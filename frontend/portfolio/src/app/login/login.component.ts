import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { LoginService } from "./login.service";
import { AlertComponent } from "../alert/alert.component";
import { NavigationComponent } from "../navigation/navigation.component";

export interface LoginUser {
  email: string,
  password: string
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, AlertComponent, NavigationComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  protected loginFailed: boolean = false;

  constructor (private loginSvc: LoginService) {}

  protected user: LoginUser = {
    email: '',
    password: ''
  };

  ngOnInit(): void {}

  protected login(ngForm: NgForm) {
    const { email, password } = ngForm.value;
    this.loginSvc.doEmailPasswordLogin(email, password)
      .then()
      .catch( error => {this.loginFailed = true;});
  }
}
