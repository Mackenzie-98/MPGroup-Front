import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/service/auth/auth.service';
import { User } from '../../shared/model/user/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/service/users/user.service';

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
    private usersService: UserService,
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
        this.user = userData;
        this.initializeForm();
      } else {
        this.errorMessage = 'No se encontró información del usuario.';
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
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup): null | { mismatch: true } {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

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

    const updatedData: any = {
      name: this.profileForm.get('name')?.value,
      area: this.profileForm.get('area')?.value,
    };

    const password = this.profileForm.get('password')?.value;

    if (password) {
      updatedData.password = password;
    }

    this.usersService.updateUser(this.user.username, updatedData).subscribe(
      (updatedUser: User) => {
        this.isLoading = false;
        this.successMessage = 'Perfil actualizado con éxito.';
        localStorage.setItem('user', JSON.stringify(updatedUser));
        this.user = updatedUser;
        this.initializeForm();
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Error al actualizar el perfil.';
        console.error(error);
      }
    );
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
