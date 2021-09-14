import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { authValidators } from 'src/app/core/constants/auth-validators';
import { maxUserAge, minUserAge } from 'src/app/core/constants/user';
import { User } from 'src/app/core/models/users/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/features/profile/profile.service';
import { getThisDateSeveralYearsAgo } from 'src/app/utils/date.utils';

interface FormData {
  username: string,
  birthday: string | null,
}

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>()

  public isUserLaded = false
  public isFormDataChanged = false

  public maxInputDate = this.formatDateToString(getThisDateSeveralYearsAgo(minUserAge))
  public minInputDate = this.formatDateToString(getThisDateSeveralYearsAgo(maxUserAge))

  public currentUser: User
  public currentUserFormData: FormData

  public profileForm: FormGroup = this.fb.group({
    username: this.fb.control('', [Validators.required, ...authValidators.username]),
    email: this.fb.control({ value: '', disabled: true }),
    birthday: this.fb.control(''),
  })

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private toaster: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initOnUserChangeSubscribe()

    this.initOnFormDataChangeSubscribe()
  }

  ngOnDestroy() {
    this.destroyed$.next()
    this.destroyed$.complete()
  }

  initOnUserChangeSubscribe() {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        if (res !== null) {
          this.currentUser = res
          this.updateFormData()

          this.isUserLaded = true
        }
      })
  }

  initOnFormDataChangeSubscribe() {
    this.profileForm.valueChanges.subscribe(value => {
      console.log('current value', JSON.stringify(value));
      console.log('prevData', JSON.stringify(this.currentUserFormData));

      this.isFormDataChanged = JSON.stringify(value) !== JSON.stringify(this.currentUserFormData)
    })
  }

  updateFormData(): void {
    this.currentUserFormData = {
      username: this.currentUser.username,
      birthday: this.currentUser.birthday ? this.formatDateToString(new Date(this.currentUser.birthday)) : '',
    }
    this.profileForm.setValue({ ...this.currentUserFormData, email: this.currentUser.email })
  }

  formatDateToString(date: Date = new Date()): string {
    return date.toISOString().split('T')[0]
  }

  submitFrom() {
    const formData = this.formatFormData(this.profileForm.value)

    this.profileService.patchProfile(formData).subscribe({
      next: () => {
        this.toaster.success('Your profile was successfully updated')
        this.authService.fetchAndUpdateUserData()
      },
      error: (err) => {
        console.log(err)
        this.toaster.error('Your profile was NOT updated. Try this operation later. Sorry 😅')
      }
    })
  }

  formatFormData(data: FormData): FormData {
    const newData: FormData = data
    newData.birthday = newData.birthday ? new Date(newData.birthday).toISOString() : null
    return newData
  }
}
