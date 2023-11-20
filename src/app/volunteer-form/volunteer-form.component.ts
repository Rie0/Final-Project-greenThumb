import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VolunteerService } from 'src/app/services/volunteer.service';

@Component({
  selector: 'app-volunteer-form',
  templateUrl: './volunteer-form.component.html',
  styleUrls: ['./volunteer-form.component.css']
})
export class VolunteerFormComponent {
  volunteerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private volunteerService: VolunteerService
  ) {
    this.volunteerForm = this.fb.group({
      volunteerName: ['', Validators.required],
      volunteerInfo: this.fb.group({
        phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        volunteerEmail: ['', [Validators.required, Validators.email]],
      }),
    });
  }

  onSubmit() {
    if (this.volunteerForm && this.volunteerForm.valid) {
      const volunteerData = this.volunteerForm.value;
      console.log('Form Data:', volunteerData);
      this.volunteerService.postVolunteer(volunteerData).subscribe(
        () => {
          console.log('Volunteer saved successfully.');
          // Reset the form after successful submission
          if (this.volunteerForm) {
            this.volunteerForm.reset();
          }
        },
        (error) => {
          console.error('Error saving volunteer:', error);
        }
      );
    }
  }
}