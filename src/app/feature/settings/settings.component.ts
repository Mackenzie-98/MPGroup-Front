import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/service/auth/auth.service';
import { User } from '../../shared/model/user/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user!: User;
  profileForm!: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      if (userData && userData.username) {
        this.authService.getUser(userData.username).subscribe(
          (user: User) => {
            this.user = user;
            this.initializeForm();
          },
          (error) => {
            this.errorMessage = 'Error al obtener los datos del usuario.';
            console.error(error);
          }
        );
      }
    } else {
      this.errorMessage = 'No se encontró información del usuario.';
    }
  }

  initializeForm(): void {
    this.profileForm = this.fb.group({
      username: [{ value: this.user.username, disabled: true }],
      name: [this.user.name, Validators.required],
      area: [this.user.area, Validators.required],
      password: [''],
      confirmPassword: ['']
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup): null | { mismatch: true } {
    const password = this.passwordControl?.value;
    const confirmPassword = this.confirmPasswordControl?.value;

    if (password && password !== confirmPassword) {
      return { mismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const nameControl = this.profileForm.get('name');
    const areaControl = this.profileForm.get('area');
    const passwordControl = this.profileForm.get('password');

    if (nameControl && areaControl) {
      const updatedData: any = {
        name: nameControl.value,
        area: areaControl.value,
      };

      if (passwordControl && passwordControl.value) {
        updatedData.password = passwordControl.value;
      }

      this.authService.updateUser(this.user.username, updatedData).subscribe(
        (updatedUser: User) => {
          this.isLoading = false;
          this.successMessage = 'Perfil actualizado con éxito.';
          // Actualizar los datos en localStorage
          localStorage.setItem('user', JSON.stringify(updatedUser));
          // Reiniciar el formulario
          this.profileForm.reset({
            username: updatedUser.username,
            name: updatedUser.name,
            area: updatedUser.area,
            password: '',
            confirmPassword: ''
          });
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = 'Error al actualizar el perfil.';
          console.error(error);
        }
      );
    } else {
      this.isLoading = false;
      this.errorMessage = 'Error en el formulario.';
    }
  }

  get nameControl() {
    return this.profileForm.get('name');
  }

  get areaControl() {
    return this.profileForm.get('area');
  }

  get passwordControl() {
    return this.profileForm.get('password');
  }

  get confirmPasswordControl() {
    return this.profileForm.get('confirmPassword');
  }
}
