import { Component,OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.css']
})
export class SingleProjectComponent implements OnInit{

  project: any = {};
  newProjectName: string = '';

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.getSingleproject();
  }

  getSingleproject() {
    const projectId = this.route.snapshot.params['projectId'];
    this.projectService.getSingleProject(projectId).subscribe({
      next: (data) => {
        this.project = data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
  updateProjectName(): void {
    const projectId = this.route.snapshot.params['projectId'];
    const projectNameDTO = { projectName: this.newProjectName };

    this.projectService.updateProjectName(projectId, projectNameDTO).subscribe({
      next: () => {
        console.log('Project name updated successfully.');
        // trigger a reload.
      },
      error: (e) => {
        console.log('Error updating project name:', e);
      }
    });
  }
  
  deleteProject(): void {
    const projectId = this.route.snapshot.params['projectId'];
  
    this.projectService.deleteProject(projectId).subscribe({
      next: () => {
        console.log('Project deleted successfully.');
        // add navigate to project component.
      },
      error: (e) => {
        console.log('Error deleting project:', e);
      }
    });
  }
}