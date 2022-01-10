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
import { BracketComponent } from './bracket/bracket.component';
import { OlympialaisetComponent } from './olympialaiset/olympialaiset.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ChampionsLeagueComponent } from './champions-league/champions-league.component';
import { OneRoundBracketComponent } from './one-round-bracket/one-round-bracket.component'
import { MatTabsModule } from '@angular/material/tabs';
import { AuthGuard } from './auth.guard';
import { LogInComponent } from './log-in/log-in.component';

const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'olympialaiset', component: OlympialaisetComponent, canActivate: [AuthGuard] },
  { path: 'champions-league', component: ChampionsLeagueComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideNavigationComponent,
    BracketComponent,
    OlympialaisetComponent,
    ChampionsLeagueComponent,
    OneRoundBracketComponent,
    LogInComponent
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
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
