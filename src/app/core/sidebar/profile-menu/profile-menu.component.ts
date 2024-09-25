import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent implements OnInit {
  isProfileMenuOpen = false;
  userInitials: string = '';
  userName: string = '';
  userEmail: string = '';

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.setUserDetails();
  }

  setUserDetails() {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      const username = parsedUser.username;
      this.userName = parsedUser.name || '';
      this.userEmail = parsedUser.email || '';

      if (username) {
        this.userInitials = this.extractInitials(username);
      }
    }
  }

  extractInitials(username: string): string {
    const names = username.split(' ');
    let initials = names[0][0];
    if (names.length > 1) {
      initials += names[1][0];
    }
    return initials.toUpperCase();
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    this.isProfileMenuOpen = false; // Cierra el menú al cerrar sesión
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const targetElement = event.target as HTMLElement;
    if (this.isProfileMenuOpen && !targetElement.closest('.profile-container')) {
      this.isProfileMenuOpen = false;
    }
  }

  navigateToProfile() {
    this.router.navigate(['/perfil']);
    this.isProfileMenuOpen = false; // Cierra el menú al navegar
  }
}
