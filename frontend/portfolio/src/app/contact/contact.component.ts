import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AlertComponent } from "../alert/alert.component";

interface ContactForm {
  name: string,
  email: string,
  phoneNumber: string,
  subject: string,
  message: string
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, AlertComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  protected contactForm: ContactForm = {} as ContactForm;
  protected sendSuccess: boolean = false;

  protected send(ngForm: NgForm) {
    ngForm.form.markAllAsTouched();
    if(ngForm.valid) {
      // TODO process send email.
      this.sendSuccess = true;
      ngForm.reset();
      setTimeout(() => {this.sendSuccess = false}, 1000);
    }
  }
}
