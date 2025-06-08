import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home'; // Adjusted path
import { LoginComponent } from './components/login/login'; // Adjusted path
import { RegisterComponent } from './components/register/register'; // Adjusted path
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy'; // Adjusted path
import { DashboardComponent } from './components/dashboard/dashboard'; // Adjusted path
import { DriverListComponent } from './components/driver-list/driver-list'; // Adjusted path
import { UserListComponent } from './components/user-list/user-list'; // Adjusted path
import { RiderListComponent } from './components/rider-list/rider-list'; // Adjusted path
import { AdminListComponent } from './components/admin-list/admin-list'; // Adjusted path
import { UserDetailComponent } from './components/user-detail/user-detail'; // Import UserDetailComponent
import { AllUsersCartsComponent } from './components/all-users-carts/all-users-carts'; // Import AllUsersCartsComponent
import { PageNotFoundComponent } from './components/page-not-found/page-not-found'; // Import PageNotFoundComponent
import { authGuard } from './services/auth-guard'; // Adjusted path

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'driver-list',
    component: DriverListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'rider-list',
    component: RiderListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin-list',
    component: AdminListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'users/:id',
    component: UserDetailComponent,
    canActivate: [authGuard]
  },
  {
    path: 'all-users-carts',
    component: AllUsersCartsComponent,
    canActivate: [authGuard]
  },
  // Fallback route (optional)
  // { path: '**', redirectTo: '' }
  { path: '**', component: PageNotFoundComponent }
];
