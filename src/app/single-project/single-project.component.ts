import { Component,OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { VolunteerService } from '../services/volunteer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.css']
})

export class SingleProjectComponent implements OnInit {
  project: any = {};
  newProjectName: string = '';
  selectedProjectId!: number;
  selectedVolunteerId!: number;
  projects!: any[]; 
  volunteers!: any[]; 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private volunteerService: VolunteerService
  ) {}

  ngOnInit() {
    this.getSingleproject();
    this.fetchProjectsAndVolunteers();
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

  fetchProjectsAndVolunteers() {
    this.projectService.getProjects().subscribe((data) => {
      this.projects = data;
    });

    this.volunteerService.getVolunteers().subscribe((data) => {
      this.volunteers = data;
    });
  }

  updateProjectName(): void {
    const projectId = this.route.snapshot.params['projectId'];
    const projectNameDTO = { projectName: this.newProjectName };

    this.projectService.updateProjectName(projectId, projectNameDTO).subscribe({
      next: () => {
        console.log('Project name updated successfully.');
        // trigger a reload.
        this.getSingleproject();
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
        //navigate to project component.  
        this.router.navigate(['/Project List']);
        alert('project deleted succesfully')
      },
      error: (e) => {
        console.log('Error deleting project:', e);
      }
    });
  }

  assignVolunteerToProject() {
    // Assign the volunteer to the currently open project.
    this.volunteerService
      .assignVolunteerToProject(this.selectedVolunteerId, this.project.projectId)
      .subscribe(
        (response) => {
          console.log('Volunteer assigned to project successfully', response);
          alert("Volunteer enlisted successfully.")
        },
        (error) => {
          console.error('Error assigning volunteer to project', error);
          alert("Error enlisting Volunteer.")
        }
      );
  }
}