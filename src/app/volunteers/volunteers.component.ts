// volunteers.component.ts
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { VolunteerService } from '../services/volunteer.service';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VolunteersComponent implements OnInit {
  volunteers: any[] = [];
  searchString: string = '';
  errorMessage: string = '';

  constructor(private volunteerService: VolunteerService) {}

  ngOnInit() {
    this.getVolunteers();
  }

  getVolunteers() {
    this.volunteerService.getVolunteers().subscribe(
      (volunteers: any[]) => {
        this.updateVolunteersList(volunteers);
      },
      (error: any) => {
        console.log('Error:', error);
      }
    );
  }

  onSearch() {
    if (this.searchString.trim() !== '') {
      this.volunteerService.getVolunteersContainingString(this.searchString).subscribe(
        (filteredVolunteers: any[]) => {
          this.updateVolunteersList(filteredVolunteers);
          this.errorMessage = ''; // Clear any previous error messages
        },
        (error: any) => {
          console.log('Error:', error);
          this.errorMessage = 'No volunteer found.'; // Display an error message
          this.clearVolunteersList();
        }
      );
    } else {
      this.getVolunteers();
    }
  }

  private updateVolunteersList(volunteers: any[]) {
    this.volunteers = volunteers;
  }

  private clearVolunteersList() {
    this.volunteers = [];
  }
}
