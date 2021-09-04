import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UsersQueryParams } from '../../models/users-query-params.model';
import { UsersRes } from '../../models/users-res.model copy';
import { AbstractUsersService } from '../../services/users.abstract-service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  private usersService : AbstractUsersService

  private subscriptions: Subscription[] = []
  private usersResSubject: BehaviorSubject<UsersRes>
  public usersRes$: Observable<UsersRes>

  public isLoaderActive: boolean = true
  public searchValue: string = ''

  constructor(
    private route: ActivatedRoute,
    private injector: Injector,
  ) { }

  ngOnInit(): void {
    const serviceToken = this.route.snapshot.data.requiredServiceToken
    this.usersService = this.injector.get<AbstractUsersService>(serviceToken)

    this.usersResSubject = new BehaviorSubject<UsersRes>(({} as UsersRes))
    this.usersRes$ = this.usersResSubject.asObservable();

    this.searchUsers()
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  searchUsers() {
    this.isLoaderActive = true

    const params: Partial<UsersQueryParams> = {
      search: this.searchValue,
    }

    this.usersService.getUsers(params).subscribe((res) => {
      this.usersResSubject.next(res)
      this.isLoaderActive = false
    })
  }

}
