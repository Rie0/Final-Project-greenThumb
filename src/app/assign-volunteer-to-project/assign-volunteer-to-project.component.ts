import { Component , OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service'; // Import your project service
import { VolunteerService } from 'src/app/services/volunteer.service'; // Import your volunteer service

@Component({
  selector: 'app-assign-volunteer-to-project',
  templateUrl: './assign-volunteer-to-project.component.html',
  styleUrls: ['./assign-volunteer-to-project.component.css']
})
export class AssignVolunteerToProjectComponent implements OnInit {
  selectedProjectId!: number;
  selectedVolunteerId!: number;
  projects!: any[]; // Update the type based on your project model
  volunteers!: any[]; // Update the type based on your volunteer model

  constructor(
    private projectService: ProjectService,
    private volunteerService: VolunteerService
  ) {}

  ngOnInit() {
    // Fetch projects and volunteers when the component initializes
    this.projectService.getProjects().subscribe((data) => {
      this.projects = data;
    });

    this.volunteerService.getVolunteers().subscribe((data) => {
      this.volunteers = data;
    });
  }

  assignVolunteerToProject() {
    // Call your service method to assign the volunteer to the project
    this.volunteerService
      .assignVolunteerToProject(this.selectedVolunteerId, this.selectedProjectId)
      .subscribe(
        (response) => {
          console.log('Volunteer assigned to project successfully', response);
          // You may want to update the UI or navigate to a different page here
        },
        (error) => {
          console.error('Error assigning volunteer to project', error);
        }
      );
  }
}