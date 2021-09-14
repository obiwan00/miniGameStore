import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from 'src/app/core/services/features/profile/profile.service';


@NgModule({
  declarations: [
    ProfileComponent,
  ],
  providers: [
    ProfileService,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoaderModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
