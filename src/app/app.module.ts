import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './feature/home/home.component';
import { SettingsComponent } from './feature/settings/settings.component';
import { LoginComponent } from './feature/login/login.component';
import { AuthGuard } from './auth.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CalculatorComponent } from './feature/calculator/calculator.component';
import { CutSectionComponent } from './feature/cut-section/cut-section.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonComponent } from './core/button/button.component';
import { NotificationComponent } from './core/notification/notification.component';
import { ConsultarInfoComponent } from './feature/consultar-info/consultar-info.component';
import { NormalizeComponent } from './feature/normalize/normalize.component';
import { AuthInterceptor } from './shared/interceptor/auth-interceptor';
import { CorteInfoComponent } from './feature/consultar-info/corte-info/corte-info.component';
import { IngenieriaInfoComponent } from './feature/consultar-info/ingenieria-info/ingenieria-info.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { ProfileMenuComponent } from './core/sidebar/profile-menu/profile-menu.component';
import { ModalComponent } from './core/modal/modal.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'calculator', component: CalculatorComponent, canActivate: [AuthGuard] },
    { path: 'cut-section', component: CutSectionComponent, canActivate: [AuthGuard] },
    { path: 'consultar-info', component: ConsultarInfoComponent, canActivate: [AuthGuard] },
    { path: 'normalizar', component: NormalizeComponent, canActivate: [AuthGuard] },
    { path: 'consultar-ingenieria', component: IngenieriaInfoComponent, canActivate: [AuthGuard] },
    { path: 'consultar-corte', component: CorteInfoComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/home' }
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CalculatorComponent,
        SettingsComponent,
        CutSectionComponent,
        LoginComponent,
        NotificationComponent,
        ButtonComponent,
        ConsultarInfoComponent,
        NormalizeComponent,
        SidebarComponent,
        ProfileMenuComponent,
        ModalComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes)
    ],
    providers: [
        AuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
