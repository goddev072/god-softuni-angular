import {Observable, share, switchMap} from "rxjs";
import {loadingSub} from "../utils/utils";
import firebase from "firebase/compat";
import {RegisterUser, UserProfile} from "../register/register.component";
import {LoginUser} from "../login/login.component";

export interface IAuthenticationService {

  isUserAuthenticated(): Observable<boolean>;

  signOut(): void;

  signInWithEmailAndPassword (email: string, password: string): Promise<firebase.auth.UserCredential>;

  signIn (user: LoginUser): void;

  createUser(registerUser: RegisterUser): void;

  // Use this method to retrieve user information
  get userProfile(): Observable<UserProfile | null>;

  updateUser(userProfile: UserProfile): Observable<void>;
}
