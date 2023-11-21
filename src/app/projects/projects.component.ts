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

  getFormattedProjectType(projectType: string): string {
    // Replace underscores with spaces and capitalize the first letter of each word.
    return projectType.replace(/_/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
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