import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListingComponent } from './user-listing/user-listing.component';

const routes: Routes = [
  {path : 'createUser',component:CreateUserComponent},
  {path : 'deleteUser',component:DeleteUserComponent},
  {path : 'updateUser',component:UpdateUserComponent},
  {path : 'userDetails',component:UserDetailsComponent},
  {path : 'userListing',component:UserListingComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
