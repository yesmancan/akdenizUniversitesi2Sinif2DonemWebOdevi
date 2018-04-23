import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from "../services/auth.service";
import { AuthGuardService } from '../auth/auth-guard.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public mail: string;
  public pass: string;

  constructor(
    private authService: AuthService,
    private authGuard: AuthGuardService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.authGuard.canActivate()) {
      this.router.navigate(['pages/dashboard']);
    }
  }
  onlogin() {
    this.authService.login(this.mail, this.pass).then(res => {
      if (res !== undefined)
        if (res.status == 200) {
          this.router.navigateByUrl('pages/dashboard');
          return true;
        }
    });
  }
}
