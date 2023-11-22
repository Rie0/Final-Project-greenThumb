import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VolunteerService } from 'src/app/services/volunteer.service';

@Component({
  selector: 'app-volunteer-form',
  templateUrl: './volunteer-form.component.html',
  styleUrls: ['./volunteer-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VolunteerFormComponent implements OnInit {
  volunteerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private volunteerService: VolunteerService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.volunteerForm = this.fb.group({
      volunteerName: ['', [Validators.required, Validators.minLength(3)]],
      volunteerInfo: this.fb.group({
        phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        volunteerEmail: ['', [Validators.required, Validators.email]],
      }),
    });
  }

  onSubmit(): void {
    if (this.volunteerForm.valid) {
      this.volunteerService.postVolunteer(this.volunteerForm.value).subscribe(
        () => {
          console.log('Volunteer saved successfully.');
          this.resetForm();
          alert('Volunteer added successfully.');
        },
        (error) => {
          console.error('Error saving volunteer:', error);
          alert('An error occurred.');
        }
      );
    }
  }

  resetForm(): void {
    this.volunteerForm.reset();
  }

  // Helper methods to access form controls
  get volunteerNameControl() {
    return this.volunteerForm.get('volunteerName');
  }

  get phoneNumberControl() {
    return this.volunteerForm.get('volunteerInfo.phoneNumber');
  }

  get volunteerEmailControl() {
    return this.volunteerForm.get('volunteerInfo.volunteerEmail');
  }
}
