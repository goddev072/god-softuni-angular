import { Injectable } from '@angular/core';
import { AbstractService } from '../common/abstract.service';
import { RegisterUser } from "./register.component";
import { AuthenticationService } from "../auth/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends AbstractService {

  private readonly _resourceUrl = "/users/";

  constructor(private authSvc: AuthenticationService) {
    super();
  }

  doRegister(user: RegisterUser) {
    this.authSvc.createUser(user);
  }
}
