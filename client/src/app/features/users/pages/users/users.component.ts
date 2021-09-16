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

  private queryParams: Partial<UsersQueryParams>

  public usersRes: UsersRes | null = (null)

  public isLoaderActive: boolean = true
  public searchValue: string = ''

  public currentPage = 1
  public usersPerPage = 5
  public offset = 0

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

    this.setQueryParams()

    this.usersService.getUsers(this.queryParams).subscribe((res) => {
      this.usersRes = res
      this.isLoaderActive = false
    })
  }

  setQueryParams() {
    this.queryParams = {
      limit: this.usersPerPage,
      offset: this.offset,
      search: this.searchValue,
    }
  }

  pageChanged($event: number) {
    this.currentPage = $event
    this.offset = ($event - 1) * this.usersPerPage

    this.searchUsers()
  }

}
