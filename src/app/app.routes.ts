import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoghistoryComponent } from './loghistory/loghistory.component';
import { PermissionComponent } from './permission/permission.component';
import { SpaceAccessComponent } from './space-access/space-access.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { audit } from 'rxjs';
import { Router } from '@angular/router';

import { PermissionlistComponent } from './permissionlist/permissionlist.component';

export const routes: Routes = [ 
  { path: '', component: LoginComponent, canActivate: [AuthGuard] }, // Página de inicio
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]  },
  { path: 'permisos', component: PermissionComponent, canActivate: [AuthGuard]  },
  { path: 'gestion-usuario', component: UsersComponent, canActivate: [AuthGuard]  },
  { path: 'historial', component: LoghistoryComponent, canActivate: [AuthGuard]  },
  { path: 'espacios', component: SpaceAccessComponent, canActivate: [AuthGuard]  },
  { path: 'tablero', component: DashboardComponent, canActivate: [AuthGuard]  }, // Asegurar que esta ruta exista
  { path: 'lista-permisos', component: PermissionlistComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }

];