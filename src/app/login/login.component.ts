import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../_services/login.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { TranslateService } from '@ngx-translate/core';

/**
 * Componente para la gestión del login.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  /**
   * Modelo de formulario.
   */
  model: any = {};

  constructor(
    private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService,
    private loginService: LoginService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loginService.logout();
  }

  /**
   * Realiza el login del usuario.
   */
  login() {
    this.loginService.login(this.model.username, this.model.password).subscribe(
      (result) => {
        if (result) {
          this.userService.getUserData().subscribe((user: User) => {
            localStorage.setItem('current_user', JSON.stringify(user));
          });
          this.router.navigate(['/']);
        } else {
          this.toastr.error(
            this.translate.instant('login.error.invalid-body'),
            this.translate.instant('login.error.invalid')
          );
        }
      },
      (error: Response | any) => {
        this.toastr.error(
          this.translate.instant('login.error.invalid-body'),
          this.translate.instant('login.error.invalid')
        );
      }
    );
  }
}
