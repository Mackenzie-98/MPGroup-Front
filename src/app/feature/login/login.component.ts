import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoading: boolean = false;  // Añadir esta variable

  constructor(private router: Router, private authService: AuthService) { }

  onSubmit() {
    this.isLoading = true;  // Mostrar el spinner
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // Agregar una pausa de 1 segundo
        setTimeout(() => {
          this.isLoading = false;  // Ocultar el spinner después de 1 segundo

          if (response.message === 'Login successful') {
            localStorage.setItem('user', JSON.stringify(response.user));
            this.router.navigate(['/home']);
          } else {
            alert('Invalid username or password');
          }
        }, 1000);  // 1000 ms = 1 segundo
      },
      (error) => {
        // Ocultar el spinner inmediatamente si hay un error
        this.isLoading = false;
        alert('Error: ' + error.message);
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
