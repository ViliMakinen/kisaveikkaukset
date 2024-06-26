import { Component, OnInit } from '@angular/core';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { NgForOf, PercentPipe } from '@angular/common';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../user.service';
import { TournamentService } from '../tournament.service';
import { GroupService } from '../group.service';
import { MatDialog } from '@angular/material/dialog';
import { PlayerGroup, Tournament, TournamentWithId } from '../constants';

@Component({
  selector: 'app-playoff',
  templateUrl: './playoff.component.html',
  styleUrl: './playoff.component.scss',
})
export class PlayoffComponent implements OnInit {
  group$: Observable<PlayerGroup> | null = null;
  group: PlayerGroup | null = null;
  groupSubscription: Subscription | null = null;
  tournamentSubscription!: Subscription;
  tournament$!: Observable<TournamentWithId>;
  tournament: Tournament | null = null;

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    public userService: UserService,
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
    private groupService: GroupService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    const groupId$ = this.route.params.pipe(map((params) => parseInt(params['groupId'], 10)));
    this.group$ = groupId$.pipe(switchMap((groupId) => this.groupService.getGroupById(groupId)));
    this.groupSubscription = this.group$.subscribe((group) => {
      this.group = group;
      this.tournament$ = groupId$.pipe(switchMap(() => this.tournamentService.getTournamentById(group.tournamentId)));
      this.tournamentSubscription = this.tournament$.subscribe((tournament) => {
        this.tournament = tournament.tournamentData;
        const matches = this.tournament.groups.flatMap((group) => group.matches);
      });
    });
  }
}
