import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '../services/volunteer.service';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.css']
})
export class VolunteersComponent {
  volunteers: any[]=[];

  constructor(private volunteerService: VolunteerService){}

  
  ngOnInit() {
    this.getProjects();
  }

  getProjects(): void{
    this.volunteerService.getVolunteers().subscribe(
      (volunteers: any[]) => {
        console.log('Projects:', volunteers); // Log the data 
        this.volunteers = volunteers;
      },
      (error: any) => {
        console.log('Error:', error);
      }
    );
  }



}
