import { Injectable } from '@angular/core';
import { AbstractService } from '../common/abstract.service';
import { HttpClient } from "@angular/common/http";
import { Environment } from "@angular/cli/lib/config/workspace-schema";
import { environment } from "../../environments/environment.development";
import { RegisterUser } from "./register.component";


@Injectable({
  providedIn: 'root'
})
export class RegisterService extends AbstractService {

  private readonly _resourceUrl = "/users/";

  constructor(private client: HttpClient) {
    super();
  }


  doRegister(user: RegisterUser) {

    console.log(this.database.list("users").query.get().then(data => data.forEach( a => console.log(a.val()))));

    // let a = ((b: any, c: any) => {
    //   console.log(b);
    //   console.log(c);
    // });
    //
    // this.database.list("users").push(user).on('child_added', a);
  }
}



// this._database.object('idGenerator').set(this.generatorId++);
// this._database.list("users/test34").valueChanges().subscribe((data:any) => console.log(data));
// console.log(this.generatorId);
// this.client.get( environment.firebaseConfig.databaseURL + this._resourceUrl +  'test24' + this.suffixDatabaseUrl).subscribe(data => console.log(data));
// this._database.object('idGenerator').valueChanges().subscribe((data: any) => this.generatorId = data);
