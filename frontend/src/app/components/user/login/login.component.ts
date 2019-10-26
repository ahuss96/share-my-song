import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import { AuthService } from "../../../services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean;
  invalidDetails: boolean;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  // getter for form fields
  get f(): { [key: string]: AbstractControl } { return this.loginForm.controls; }

  createForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onLoginSubmit () {
    this.submitted = true;
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.auth.authenticateUser(credentials).subscribe(data => {
        if (data.success) {
          this.auth.storeUserData(data.token, data.user);
          this.router.navigate(['/'])
        }
        else {
          this.invalidDetails = true;
        }
      })
    }
  }
}
