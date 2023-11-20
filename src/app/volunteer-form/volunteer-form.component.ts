import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VolunteerService } from 'src/app/services/volunteer.service';

@Component({
  selector: 'app-volunteer-form',
  templateUrl: './volunteer-form.component.html',
  styleUrls: ['./volunteer-form.component.css']
})
export class VolunteerFormComponent implements OnInit {
  volunteerForm!: FormGroup;
  constructor(private fb: FormBuilder, private volunteerService: VolunteerService) {}

  ngOnInit() {
    this.volunteerForm = this.fb.group({
      volunteerName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      volunteerEmail: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.volunteerForm.valid) {
      // Call a method to send the volunteer data to the backend
      this.addVolunteer();
    }
  }

  addVolunteer() {
    // Get the volunteer data from the form
    const volunteerData = this.volunteerForm.value;

    // Call the service to add the volunteer to the project
    this.volunteerService.addVolunteer(volunteerData).subscribe(
      (response) => {
        console.log('Volunteer added successfully', response);
        // You may want to update the UI or navigate to a different page here
      },
      (error) => {
        console.error('Error adding volunteer', error);
      }
    );
  }
  
  assignVolunteerToProject(volunteerId: number, projectId: number) {
    this.volunteerService.assignVolunteerToProject(volunteerId, projectId).subscribe(
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
