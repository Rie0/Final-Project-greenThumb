import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { SingleProjectComponent } from './single-project/single-project.component';
import { VolunteerFormComponent } from './volunteer-form/volunteer-form.component';
import { VolunteersComponent } from './volunteers/volunteers.component';
import { ErrorPageComponent } from './error-page/error-page.component';


const routes: Routes = [
  { 
  path: '', 
   component: HomeComponent
},
{
  path: 'Project/:projectId',
  component: SingleProjectComponent
},
{
  path: 'Volunteer Form',
  component: VolunteerFormComponent
},
{
  path: 'Volunteer List',
  component: VolunteersComponent
},
{
  path: 'Project List',
  component: ProjectsComponent
},
{
path: '**',
component: ErrorPageComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
