import { Component } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

  protected title: string = 'Portfolio'
  protected authenticated: boolean = false;

  constructor(private authService: AuthenticationService) {
    this.authenticated = this.authService.isUserAuthenticated();    
  }

}
