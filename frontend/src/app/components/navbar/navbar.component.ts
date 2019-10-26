import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth/auth.service";
import { IUser } from "../user/user.model";
import { faAngleDown, faAngleUp, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: IUser;
  faSignOutAlt = faSignOutAlt;
  auth = this.authService;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // if user loads page - already logged in - so does not need to login.
    // User still needs to be populated (usually done on login)
    if (this.auth.isLoggedIn() && !this.auth.user) {
      this.user = this.auth.getUser();
    }
  }
}
