import { NgModule } from '@angular/core'; import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input'; import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon'; import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule } from '@angular/material/radio'; import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core'; import {MatDialogModule} from '@angular/material/dialog';
import { MatCardModule, MatMenuModule, MatDividerModule, MatToolbarModule, MatSidenavModule } from '@angular/material';

@NgModule({
  imports: [ MatButtonModule, MatInputModule,
             MatFormFieldModule, MatIconModule,
             MatSelectModule, MatAutocompleteModule,
             MatSlideToggleModule, MatNativeDateModule,
             MatRadioModule, MatDatepickerModule, MatDialogModule,
             MatCardModule, MatMenuModule, MatDividerModule, MatIconModule,
             MatToolbarModule, MatSidenavModule ],
  exports: [ MatButtonModule, MatInputModule,
             MatFormFieldModule, MatIconModule,
             MatSelectModule, MatAutocompleteModule,
             MatSlideToggleModule, MatNativeDateModule,
             MatRadioModule, MatDatepickerModule, MatDialogModule,
             MatCardModule, MatMenuModule, MatDividerModule, MatIconModule,
             MatToolbarModule, MatSidenavModule ]
})

export class MaterialModule { }
