import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent  implements OnInit{
  projects: any[]=[];
  errorMessage: string = '';

  constructor(private projectService: ProjectService) {}

   ngOnInit() {
    this.getProjects();
  }

  getProjects(): void{
    this.projectService.getProjects()
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          this.errorMessage = 'An error occurred while fetching projects. Please try again later.';
          return EMPTY; // Return an empty observable to prevent error.
        })
      )
      .subscribe(
        (projects: any[]) => {
          //console.log('Projects:', projects);
          this.projects = projects;
        }
      );
  }
}