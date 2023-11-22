import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  errorMessage: string = '';

  projectTypeImages: { [key: string]: { path: string, alt: string } } = {
    Ocean_cleaning: { path: '../../assets/images/Ocean.jpg', alt: 'Ocean Cleaning Project' },
    Tree_Planting: { path: '../../assets/images/Tree.PNG', alt: 'Tree Planting Project' },
    Painting_Houses: { path: '../../assets/images/painting.PNG', alt: 'Painting Houses Project' }
  };

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.getProjects();
  }

  getFormattedProjectType(projectType: string): string { //replace '_' with spaces.
    return projectType.replace(/_/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  getProjects(): void {
    this.projectService.getProjects().pipe(
      catchError((error) => {
        console.error('Error:', error);
        this.errorMessage = 'An error occurred while fetching projects. Please try again later.';
        return EMPTY;
      })
    ).subscribe(
      (projects: any[]) => {
        this.projects = projects;
      }
    );
  }
}
