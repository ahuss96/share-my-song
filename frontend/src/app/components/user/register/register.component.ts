import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth/auth.service";
import { Router } from "@angular/router";
import { IUser } from "../user.model";
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean;
  invalidDetails: boolean;
  faUserCircle = faUserCircle;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.initLoginForm();
  }

  // getter for form fields
  get f(): { [key: string]: AbstractControl } { return this.registerForm.controls; }

  initLoginForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  onSubmit () {
    // used to show errors in form only when user has submitted.
    this.submitted = true;
    if (this.registerForm.valid) {
      const user: IUser = {
        name: this.registerForm.get('name').value,
        email: this.registerForm.get('email').value,
        username: this.registerForm.get('username').value,
        password: this.registerForm.get('password').value,
        userType: 'general'
      };

      this.auth.registerUser(user).subscribe(data => {
        if (data.success) {
          console.log(data);
          // store user and jwt token in localstorage
          this.router.navigate(['/'])
        }
        else {
          console.log(data);
        }
      })
    }
  }

}
