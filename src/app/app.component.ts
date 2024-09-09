import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mp-group-app';
  isUserAuthenticated: boolean = false;
  isSidebarCollapsed: boolean = false;
  sessionTimeout = 3600000;
  timeout: any;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkUserAuthentication();
        this.resetTimeout();
      }
    });
  }

  @HostListener('window:click')
  @HostListener('window:mousemove')
  @HostListener('window:keydown')
  resetTimeout() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.logout(), this.sessionTimeout);
  }

  checkUserAuthentication() {
    const user = localStorage.getItem('user');
    this.isUserAuthenticated = !!user; // Actualiza el estado de autenticación
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const screenWidth = window.innerWidth;
    this.isSidebarCollapsed = screenWidth <= 768; // Colapsa el sidebar automáticamente en pantallas pequeñas
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
