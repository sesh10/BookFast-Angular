import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formData: any = {};
  errors: any[] = [];

  constructor(private auth: AuthService, private router: Router, private toastr: ToastrManager) { }

  ngOnInit(): void {
  }

  register() {
    this.auth.register(this.formData).subscribe(
      () => {
        this.router.navigate(['/login', {registered: 'success'}]);
        this.toastr.successToastr('Registration successful! You may now login', 'Success!');
      },
      (errorResponse) => {
        this.errors = errorResponse.error.errors;
      }
    );
  }

}
