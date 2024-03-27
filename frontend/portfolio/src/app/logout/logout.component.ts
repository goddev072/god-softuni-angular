import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../auth/authentication.service";

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit {

  constructor (private authSvc: AuthenticationService) {}

  ngOnInit(): void {
    localStorage.clear();
    this.authSvc.signOut();
  }

}
