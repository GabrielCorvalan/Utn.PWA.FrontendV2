import { InternshipCancelComponent } from './internship-cancel/internship-cancel.component';
import { Component, OnInit } from '@angular/core';
import { IInternship } from 'src/app/intefaces/IInternship';
import { InternshipService } from './internship.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-internship',
  templateUrl: './internship.component.html',
  styles: []
})
export class InternshipComponent implements OnInit {

  internships: IInternship[];
  constructor(private internshipService: InternshipService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.GetInternships();
  }

  GetInternships(): void {
    this.internshipService.getAllInternships()
      .subscribe((res: IInternship[]) => {
          this.internships = res;
      }, (error: any): void => console.log(error));
  }

  openDialog(intership: IInternship): void {
    const dialogRef = this.dialog.open(InternshipCancelComponent, {
      width: '350px',
      data: intership
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('se cerro');
    });
  }

}
