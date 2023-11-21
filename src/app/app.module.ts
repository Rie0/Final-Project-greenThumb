import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { VolunteersComponent } from './volunteers/volunteers.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { VolunteerFormComponent } from './volunteer-form/volunteer-form.component';
import { SingleProjectComponent } from './single-project/single-project.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectsComponent,
    VolunteersComponent,
    ErrorPageComponent,
    VolunteerFormComponent,
    SingleProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
