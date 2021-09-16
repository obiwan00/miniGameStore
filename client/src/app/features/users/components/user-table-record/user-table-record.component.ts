import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { FriendlyUser, FriendshipStatus, UnfamiliarUser } from 'src/app/core/models/users/user.model';
import { FriendshipService } from 'src/app/core/services/features/users/friendship.service';

@Component({
  selector: 'user-table-record',
  templateUrl: './user-table-record.component.html',
  styleUrls: ['./user-table-record.component.scss']
})
export class UserTableRecord implements OnInit {
  @ViewChild('template') template: any

  @Output() reloadRequestEmitter = new EventEmitter<undefined>()
  @Input() user: UnfamiliarUser | FriendlyUser
  public friendshipStatus = FriendshipStatus
  public isCardDisabled = true

  constructor(
    private friendshipService: FriendshipService,
    private toastr: ToastrService,
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit(): void {
    this.isCardDisabled = false
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => { this.viewContainerRef.createEmbeddedView(this.template) })
  }

  get userEmail() {
    return (this.user as FriendlyUser)?.email
  }
  get userBirthday() {
    return (this.user as FriendlyUser)?.birthday
  }

  requestFriendship() {
    this.isCardDisabled = true

    this.friendshipService.requestFriendship(this.user._id)
      .pipe(tap(() => { this.isCardDisabled = false }))
      .subscribe({
        next: () => {
          this.toastr.success(`Request for friendship with ${this.user.username} was successfully sent.`)
          this.reloadRequestEmitter.emit()
        },
        error: () => {
          this.toastr.error(`Request for friendship with ${this.user.username} wasn't sent. Try this operation later.`)
        },
      })
  }

  deleteFriendship() {
    this.isCardDisabled = true

    this.friendshipService.deleteFriendship(this.user._id)
      .pipe(tap(() => { this.isCardDisabled = false }))
      .subscribe({
        next: () => {
          this.toastr.success(`Friendship with ${this.user.username} was successfully deleted`)
          this.reloadRequestEmitter.emit()
        },
        error: () => {
          this.toastr.error(`Request for friendship with ${this.user.username} wasn't sent. Try this operation later.`)
        },
      })
  }


  acceptFriendship() {
    this.isCardDisabled = true

    this.friendshipService.acceptFriendship(this.user._id)
      .pipe(tap(() => { this.isCardDisabled = false }))
      .subscribe({
        next: () => {
          this.toastr.success(`Friendship with ${this.user.username} was successfully accepted.`)
          this.reloadRequestEmitter.emit()
        },
        error: () => {
          this.toastr.error(`Request for friendship with ${this.user.username} wasn't sent. Try this operation later.`)
        },
      })
  }

  rejectFriendship() {
    this.isCardDisabled = true

    this.friendshipService.rejectFriendship(this.user._id)
      .pipe(tap(() => { this.isCardDisabled = false }))
      .subscribe({
        next: () => {
          this.toastr.success(`Friendship with ${this.user.username} was successfully rejected.`)
          this.reloadRequestEmitter.emit()
        },
        error: () => {
          this.toastr.error(`Request for friendship with ${this.user.username} wasn't sent. Try this operation later.`)
        },
      })
  }

}
