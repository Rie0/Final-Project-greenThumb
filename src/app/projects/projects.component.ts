import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent  implements OnInit{
  projects: any[]=[];

  constructor(private projectService: ProjectService) {}

   ngOnInit() {
    this.getProjects();
  }

  getProjects(): void{
    this.projectService.getProjects().subscribe(
      (projects: any[]) => {
        console.log('Projects:', projects); // Log the data 
        this.projects = projects;
      },
      (error: any) => {
        console.log('Error:', error);
      }
    );
  }

 }
