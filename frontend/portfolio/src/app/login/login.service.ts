import { Injectable } from '@angular/core';
import { LoginUser } from "./login.component";
import { AuthenticationService } from "../auth/authentication.service";
import { Observable } from "rxjs";
import firebase from "firebase/compat";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private authSvc: AuthenticationService) { }

  public doEmailPasswordLogin(email: string, password: string): Promise<firebase.auth.UserCredential> {
    if(email && password) {
      return this.authSvc.signInWithEmailAndPassword(email, password);
    } else {
      throw new Error('Email ot password not provided!');
    }
  }

  public doLogin(user: LoginUser) {
    if(user) {
      this.authSvc.signIn(user);
    } else {
      throw new Error('Login user not provided!')
    }
  }

}
