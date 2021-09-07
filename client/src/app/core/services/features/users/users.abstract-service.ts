import { Observable } from "rxjs";
import { UsersQueryParams } from "src/app/core/models/users/users-query-params.model";
import { UsersRes } from "src/app/core/models/users/users-res.model";

export abstract class AbstractUsersService {
  abstract getUsers(params: Partial<UsersQueryParams> ): Observable<UsersRes>
}
