import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoghistoryComponent } from './loghistory/loghistory.component';
import { PermissionComponent } from './permission/permission.component';
import { SpaceAccessComponent } from './space-access/space-access.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [ 
  { path: '', component: LoginComponent }, // Página de inicio
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'permisos', component: PermissionComponent },
  { path: 'gestion-usuario', component: UsersComponent },
  { path: 'historial', component: LoghistoryComponent },
  { path: 'espacios', component: SpaceAccessComponent },
  { path: 'tablero', component: DashboardComponent }, // Asegurar que esta ruta exista
];