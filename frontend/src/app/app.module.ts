import {LoginGuard} from './log-in-guard.service';
import {AuthGuard} from './auth-guard.service';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {SideNavigationComponent} from './side-navigation/side-navigation.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {LogInComponent} from './log-in/log-in.component';
import {MatSelectModule} from '@angular/material/select';
import {MmKisatComponent} from './mm-kisat/mm-kisat.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {CreateGroupComponent} from './create-group/create-group.component';
import {AuthPageComponent} from './auth-page/auth-page.component';
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from '@abacritt/angularx-social-login';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AdminViewComponent} from './admin-view/admin-view.component';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatStepperModule} from '@angular/material/stepper';
import {InformationComponent} from './information/information.component';

const routes: Routes = [
  {path: '', component: LogInComponent},
  {path: 'home', component: HomeComponent},
  {path: 'MM-kisat-2022', component: MmKisatComponent},
  {path: 'create-group', component: CreateGroupComponent, canActivate: [AuthGuard]},
  {path: 'authorization', component: AuthPageComponent, canActivate: [LoginGuard]},
  {path: 'admin-view', component: AdminViewComponent},
  {path: 'information', component: InformationComponent},

  {path: '**', redirectTo: ''},
];

@NgModule({
  declarations: [AppComponent, HomeComponent, SideNavigationComponent, LogInComponent, MmKisatComponent, CreateGroupComponent, AuthPageComponent, AdminViewComponent, InformationComponent],
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
    SocialLoginModule,
    MatTooltipModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatStepperModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('290256958283-tebh5gso96b4c08s7jm78do2u3fmt4as.apps.googleusercontent.com'),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
