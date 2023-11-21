import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '../services/volunteer.service';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.css']
})
export class VolunteersComponent implements OnInit{
  volunteers: any[]=[];
  searchString: string = '';
  errorMessage: string = '';

  constructor(private volunteerService: VolunteerService){}

  
  ngOnInit() {
    this.getVolunteers();
  }

  getVolunteers() {
    this.volunteerService.getVolunteers().subscribe(
      (volunteers: any[]) => {
        //console.log('Volunteers:', volunteers);
        this.volunteers = volunteers;
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
          this.volunteers = filteredVolunteers;
          this.errorMessage = ''; // Clear any previous error messages
        },
        (error: any) => {
          console.log('Error:', error);
          this.errorMessage = 'No volunteer found.'; // Display an error message
          this.volunteers = []; //return an empty list when no volunteer is found
        }
      );
    } else {
      // If the search string is empty.
      this.getVolunteers();
    }
  }
}