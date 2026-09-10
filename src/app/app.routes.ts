import { Routes } from '@angular/router';

import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Profile } from './components/profile/profile';

import { authGuard } from './guards/auth.guard';
import { CreatePost } from './components/create-post/create-post';
import { ApartmentDetails } from './components/apartment-details/apartment-details';

export const routes: Routes = [

  {
    path: '',
    component: Home
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'register',
    component: Register
  },

  {
    path: 'profile',
    component: Profile,
    canActivate: [authGuard]
  },
  {
  path: 'create-post',
  component: CreatePost,
  canActivate: [authGuard]
},
{
  path: 'apartment/:id',
  component: ApartmentDetails
},
  {
    path: '**',
    redirectTo: ''
  }

];