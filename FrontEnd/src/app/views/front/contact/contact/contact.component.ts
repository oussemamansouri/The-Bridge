import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent  {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  isLoading: boolean = false;
  isSuccess: boolean = false;
  errorMessage: string | undefined;
  nameValue: string = '';
  emailValue: string = '';
  subjectValue: string = '';
  messageValue: string = '';
  constructor(private http: HttpClient) {}

  // onSubmit(): void {
  //   this.isLoading = true;
  //   this.http.post('http://localhost:3000/contact/send-email', this.formData).subscribe(
  //     (response: any) => {
  //       this.isLoading = false;
  //       this.isSuccess = true;
  //       this.formData = {
  //         name: '',
  //         email: '',
  //         subject: '',
  //         message: ''
  //       };
  //     },
  //     (error) => {
  //       this.isLoading = false;
  //       this.errorMessage = error.message || 'Une erreur s\'est produite lors de l\'envoi de l\'email';
  //     }
  //   );
  // }
}
