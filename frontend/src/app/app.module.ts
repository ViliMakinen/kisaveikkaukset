import { LoggedInGuard } from './log-in-guard.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MmKisatComponent } from './mm-kisat/mm-kisat.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CreateGroupComponent } from './create-group/create-group.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { InformationComponent } from './information/information.component';
import { AuthService } from './auth.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [
  { path: 'overview', component: LandingPageComponent, canActivate: [LoggedInGuard] },
  { path: '', component: AuthPageComponent },
  { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] },
  { path: 'MM-kisat-2022', component: MmKisatComponent, canActivate: [LoggedInGuard] },
  { path: 'create-group', component: CreateGroupComponent, canActivate: [LoggedInGuard] },
  { path: 'admin-view', component: AdminViewComponent, canActivate: [LoggedInGuard] },
  { path: 'information', component: InformationComponent, canActivate: [LoggedInGuard] },

  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [AppComponent, HomeComponent, SideNavigationComponent, MmKisatComponent, CreateGroupComponent, AuthPageComponent, AdminViewComponent, InformationComponent, LandingPageComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatTabsModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatTooltipModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatSnackBarModule,
  ],
  providers: [LoggedInGuard, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
