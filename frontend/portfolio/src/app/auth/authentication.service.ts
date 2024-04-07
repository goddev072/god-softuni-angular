import { inject, Injectable, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { LoginUser } from "../login/login.component";
import { BehaviorSubject, finalize, Observable, of, share, switchMap } from "rxjs";
import { Router } from "@angular/router";
import firebase from "firebase/compat";
import { loadingSub } from "src/app/utils/utils";
import { RegisterUser, UserProfile } from "../register/register.component";
import { AbstractService } from "../common/abstract.service";
import {IAuthenticationService} from "./authentication.service.interface";

const authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

@Injectable({providedIn: 'root'})
export class AuthenticationService extends AbstractService implements IAuthenticationService {

  private _auth: AngularFireAuth = inject(AngularFireAuth);
  private readonly _accessToken: string | null;

  constructor(private router: Router) {
    super();
    this._accessToken = localStorage.getItem('accessToken');
    if(this._accessToken) {
      authenticated.next(true);
    }
  }

  public isUserAuthenticated(): Observable<boolean> {
    return authenticated;
  }

  public signOut() {
    loadingSub.next(true);
    this._auth.signOut().finally(() => loadingSub.next(false));
    authenticated.next(false);
    this.router.navigate(['home']);
  }

  signInWithEmailAndPassword (email: string, password: string): Promise<firebase.auth.UserCredential> {
    loadingSub.next(true);
    let promise = this._auth.signInWithEmailAndPassword(email, password);
    promise.then(user => {
      if(user && user.user) {
        let userId = user.user.uid;
        console.log(this._auth.idToken.subscribe(data => console.log(data)));
        this._auth.currentUser.then(data => console.log(data?.toJSON()));
        this._auth.user.subscribe(data => console.log(data?.toJSON()));
        user.user?.getIdToken().then(token => {
          this.database.database.ref('users/' + userId).on("value", snapshot => {
            let currentUser: UserProfile = snapshot.val();
            currentUser.id = userId;
            // This is not good idea to store user info in localstorage. This is sensitive data, should not be exposed!!!!
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            localStorage.setItem('accessToken', token);
            authenticated.next(true);
            this.router.navigate(['home']);
          });
        })
      }
    })
    .finally(() => loadingSub.next(false));
    return promise;
  }

  signIn (user: LoginUser) {
    loadingSub.next(true);
    this._auth.signInWithEmailAndPassword(user.email, user.password)
      .then(user => console.log(user))
      .finally(() => loadingSub.next(false));
  }

  createUser(registerUser: RegisterUser) {
    loadingSub.next(true);
    this._auth.createUserWithEmailAndPassword(registerUser.email, registerUser.password)
      .then(user => {
        this.database.database.ref().child('users').child(user.user!.uid).set(registerUser);
        user.user?.getIdToken().then(token => {
          localStorage.setItem('accessToken', token);
        });
      })
      .finally(() => {
        loadingSub.next(false);
        authenticated.next(true);
        this.router.navigate(['projects'])
      });
  }

  // Use this method to retrieve user information
  get userProfile(): Observable<UserProfile | null> {
    loadingSub.next(true);
    return this._auth.user.pipe(
      switchMap( user => {
        var o = this.database.object<UserProfile>(`users/${user?.uid}`).valueChanges();
        o.subscribe(() => loadingSub.next(false));
        return o;
      }), share());
  }

  updateUser(userProfile: UserProfile): Observable<void> {
    return this._auth.user.pipe(
    switchMap(user => {
      return this.database.object(`users/${user?.uid}`).update(userProfile);
    }), share());
  }

}
