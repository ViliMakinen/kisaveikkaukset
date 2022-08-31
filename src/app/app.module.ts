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
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { LogInComponent } from './log-in/log-in.component';
import { MatSelectModule } from '@angular/material/select';
import { MmKisatComponent } from './mm-kisat/mm-kisat.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'home', component: HomeComponent },
  { path: 'MM-kisat-2022', component: MmKisatComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideNavigationComponent,
    LogInComponent,
    MmKisatComponent,
  ],
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
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
