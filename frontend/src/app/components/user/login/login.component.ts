import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import { AuthService } from "../../../services/auth/auth.service";
import { Router } from "@angular/router";
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean;
  invalidDetails: boolean;

  constructor(private auth: AuthService, private router: Router, private navbar: NavbarComponent) { }

  ngOnInit() {
    // init loginForm
    this.initLoginForm();
  }

  // getter for form fields
  get f(): { [key: string]: AbstractControl } { return this.loginForm.controls; }

  initLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit () {
    // used to show errors in form only when user has submitted.
    this.submitted = true;
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.auth.authenticateUser(credentials).subscribe(data => {
        if (data.success) {
          // store user and jwt token in localstorage
          this.auth.storeUserData(data.token, data.user);
          this.router.navigate(['/'])
        }
        else {
          // TODO handle UI for invalid credentials
          this.invalidDetails = true;
        }
      })
    }
  }
}
