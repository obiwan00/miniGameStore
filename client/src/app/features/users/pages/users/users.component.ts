import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersQueryParams } from 'src/app/core/models/users/users-query-params.model';
import { UsersRes } from 'src/app/core/models/users/users-res.model';
import { AbstractUsersService } from 'src/app/core/services/features/users/users.abstract-service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private usersService: AbstractUsersService

  public usersRes: UsersRes = ({} as UsersRes)

  public isLoaderActive: boolean = true
  public searchValue: string = ''

  constructor(
    private route: ActivatedRoute,
    private injector: Injector,
  ) { }

  ngOnInit(): void {
    const serviceToken = this.route.snapshot.data.requiredServiceToken
    this.usersService = this.injector.get<AbstractUsersService>(serviceToken)

    this.searchUsers()
  }

  searchUsers() {
    this.isLoaderActive = true

    const params: Partial<UsersQueryParams> = {
      search: this.searchValue,
    }

    this.usersService.getUsers(params).subscribe((res) => {
      this.usersRes = res
      this.isLoaderActive = false
    })
  }

}
