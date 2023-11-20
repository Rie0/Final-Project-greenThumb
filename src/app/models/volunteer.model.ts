export class VolunteerModel {
    volunteerName: string = '';
    volunteerInfo: VolunteerInfoModel = new VolunteerInfoModel();
  }
  
  export class VolunteerInfoModel {
    phoneNumber: string = '';
    volunteerEmail: string = '';
  }