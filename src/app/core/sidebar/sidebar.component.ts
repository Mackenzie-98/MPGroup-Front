import { Component, EventEmitter, OnInit, HostListener, Input } from '@angular/core';
import { navbarData } from './nav-data';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms', style({ opacity: 0 }))
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms', keyframes([
          style({ transform: 'rotate(0deg)', offset: '0' }),
          style({ transform: 'rotate(2turn)', offset: '1' })
        ]))
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  @Input() isSidebarCollapsed: boolean = false;
  screenWidth = 0;
  navData = navbarData;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.isSidebarCollapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.isSidebarCollapsed, screenWidth: this.screenWidth });
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.onToggleSideNav.emit({ collapsed: this.isSidebarCollapsed, screenWidth: this.screenWidth });
  }

  closeSidenav(): void {
    this.isSidebarCollapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.isSidebarCollapsed, screenWidth: this.screenWidth });
  }
}
function Output(): (target: SidebarComponent, propertyKey: "onToggleSideNav") => void {
  throw new Error('Function not implemented.');
}

