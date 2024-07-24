import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FormateurLayoutComponent } from './layouts/formateur-layout/formateur-layout.component';
import { ModeratorLayoutComponent } from './layouts/moderator-layout/moderator-layout.component';
import { FrontLayoutComponent } from './layouts/front-layout/front-layout.component';
import { FormationLayoutComponent } from './layouts/formation-layout/formation-layout.component';
import { GuardadminGuard } from './views/guards/guardadmin.guard';
import { GuardmoderatorGuard } from './views/guards/guardmoderator.guard';

const routes: Routes = [
{path:'',component:FrontLayoutComponent,children:[
  {path:'',loadChildren:()=>import('./views/front/home/home.module').then(m=>m.HomeModule)},
  {path:'loginuser',loadChildren:()=>import('./views/front/loginuser/loginuser.module').then(m=>m.LoginuserModule)},
  {path:'formation',loadChildren:()=>import('./views/front/formation/formation.module').then(m=>m.FormationModule)},
  {path:'actualite',loadChildren:()=>import('./views/front/actualite/actualite.module').then(m=>m.ActualiteModule)},
  {path:'tarifs',loadChildren:()=>import('./views/front/tarifs/tarifs.module').then(m=>m.TarifsModule)},
  {path:'contact',loadChildren:()=>import('./views/front/contact/contact.module').then(m=>m.ContactModule)},
]},
{path:'admin',component:AdminLayoutComponent,canActivate:[GuardadminGuard],children:[
  {path:'',loadChildren:()=>import('./views/admin/dashboard/dashboard.module').then(m=>m.DashboardModule)},
  {path:'profile',loadChildren:()=>import('./views/admin/dashboard/dashboard.module').then(m=>m.DashboardModule)},
  {path:'addmoderateur',loadChildren:()=>import('./views/admin/addmoderateurs/addmoderateurs.module').then(m=>m.AddmoderateursModule)},
  {path:'consultmoderateur',loadChildren:()=>import('./views/admin/consultmoderateur/consultmoderateur.module').then(m=>m.ConsultmoderateurModule)},
  {path:'detailsmoderateur/:id',loadChildren:()=>import('./views/admin/detailsmoderateur/detailsmoderateur.module').then(m=>m.DetailsmoderateurModule)},
  {path:'addformateur',loadChildren:()=>import('./views/admin/addformateur/addformateur.module').then(m=>m.AddformateurModule)},
  {path:'consultformateur',loadChildren:()=>import('./views/admin/consultformateur/consultformateur.module').then(m=>m.ConsultformateurModule)},
  {path:'detailsformateur/:id',loadChildren:()=>import('./views/admin/detailsformateur/detailsformateur.module').then(m=>m.DetailsformateurModule)},
  {path:'addformation',loadChildren:()=>import('./views/admin/addformation/addformation.module').then(m=>m.AddformationModule)},
  {path:'consultformation',loadChildren:()=>import('./views/admin/consultformation/consultformation.module').then(m=>m.ConsultformationModule)},
  {path:'addpaiement',loadChildren:()=>import('./views/admin/addpaiement/addpaiement.module').then(m=>m.AddpaiementModule)},
  {path:'addpack',loadChildren:()=>import('./views/admin/addpack/addpack.module').then(m=>m.AddpackModule)},
  {path:'consultpack',loadChildren:()=>import('./views/admin/consultpack/consultpack.module').then(m=>m.ConsultpackModule)},
  {path:'demande',loadChildren:()=>import('./views/admin/demande/demande.module').then(m=>m.DemandeModule)},
  {path:'loginadmin',loadChildren:()=>import('./views/admin/loginadmin/loginadmin.module').then(m=>m.LoginadminModule)},
]},
{path:'moderator',component:ModeratorLayoutComponent,canActivate:[GuardmoderatorGuard],children:[
  {path:'',loadChildren:()=>import('./views/moderator/dashboard/dashboard.module').then(m=>m.DashboardModule)},
  {path:'profile',loadChildren:()=>import('./views/moderator/dashboard/dashboard.module').then(m=>m.DashboardModule)},
  {path:'addformateur',loadChildren:()=>import('./views/moderator/addformateur/addformateur.module').then(m=>m.AddformateurModule)},
  {path:'consultformateur',loadChildren:()=>import('./views/moderator/consultformateur/consultformateur.module').then(m=>m.ConsultformateurModule)},
  {path:'detailsformateur/:id',loadChildren:()=>import('./views/moderator/detailsformateur/detailsformateur.module').then(m=>m.DetailsformateurModule)},
  {path:'addformation',loadChildren:()=>import('./views/moderator/addformation/addformation.module').then(m=>m.AddformationModule)},
  {path:'consultformation',loadChildren:()=>import('./views/moderator/consultformation/consultformation.module').then(m=>m.ConsultformationModule)},
  {path:'addpack',loadChildren:()=>import('./views/moderator/addpack/addpack.module').then(m=>m.AddpackModule)},
  {path:'consultpack',loadChildren:()=>import('./views/moderator/consultpack/consultpack.module').then(m=>m.ConsultpackModule)},
]},
{path:'formateur',component:FormateurLayoutComponent,children:[
  {path:'',loadChildren:()=>import('./views/formateur/dashboard-f/dashboard-f.module').then(m=>m.DashboardFModule)},
  {path:'profile',loadChildren:()=>import('./views/formateur/dashboard-f/dashboard-f.module').then(m=>m.DashboardFModule)},
  {path:'formation',loadChildren:()=>import('./views/formateur/formation/formation.module').then(m=>m.FormationModule)},
  {path:'addformation',loadChildren:()=>import('./views/formateur/addformation/addformation.module').then(m=>m.AddformationModule)},
  {path:'participation',loadChildren:()=>import('./views/formateur/participation/participation.module').then(m=>m.ParticipationModule)},
  {path:'demandeenvoyer',loadChildren:()=>import('./views/formateur/demande-e/demande-e.module').then(m=>m.DemandeEModule)},
  {path:'demanderecue',loadChildren:()=>import('./views/formateur/demande-r/demande-r.module').then(m=>m.DemandeRModule)},
  {path:'message',loadChildren:()=>import('./views/formateur/message/message.module').then(m=>m.MessageModule)},
]},





// {path:'formation',component:FormationLayoutComponent,children:[
//   {path:'',loadChildren:()=>import('./views/front/formation/formation.module').then(m=>m.FormationModule)},
// ]}

// {path:'formateur',component:FormateurLayoutComponent},
// {path:'moderator',component:ModeratorLayoutComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
