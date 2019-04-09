import { IInternship } from './../../../../intefaces/IInternship';
import { InternshipService } from './../internship.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-internship-cancel',
  templateUrl: './internship-cancel.component.html',
  styles: []
})
export class InternshipCancelComponent implements OnInit {
  cancelationDescription = new FormControl('', Validators.required);
  id: number;
  constructor(private internshipService: InternshipService,
              public dialogRef: MatDialogRef<InternshipCancelComponent>,
              @Inject(MAT_DIALOG_DATA) public internship: IInternship) { }

  ngOnInit() {
    console.log(this.internship);
  }

  cancelInternship() {
    console.log('cancel');
    // this.internshipService.cancelInternship(this.id, this.cancelationDescription.value)
    //   .subscribe((res: boolean)=> {
    //     console.log(res);
    //   }, (error: any) => console.log(error));
  }

  closeModal() {
    this.dialogRef.close();
  }

}
