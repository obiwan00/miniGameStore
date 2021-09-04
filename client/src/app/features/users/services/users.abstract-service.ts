import { Observable } from "rxjs";
import { UsersQueryParams } from "../models/users-query-params.model";
import { FriendsRes, UsersRes } from "../models/users-res.model copy";

export abstract class AbstractUsersService {
  abstract getUsers(params: Partial<UsersQueryParams> ): Observable<UsersRes>
}
