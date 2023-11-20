import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { SingleProjectComponent } from './single-project/single-project.component';
import { VolunteerFormComponent } from './volunteer-form/volunteer-form.component';
import { VolunteersComponent } from './volunteers/volunteers.component';
import { AssignVolunteerToProjectComponent } from './assign-volunteer-to-project/assign-volunteer-to-project.component';


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
  path: 'Assign Volunteer to Project', 
  component: AssignVolunteerToProjectComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
