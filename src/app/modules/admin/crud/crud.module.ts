import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudComponent } from './crud.component';
import { Route, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CrudFormComponent } from './crud-form/crud-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CrudService } from './crud.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedModule } from 'app/shared/shared.module';
import { FuseConfirmationModule } from '@fuse/services/confirmation';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



const route: Route[] = [
  {
      path: '',
      component: CrudComponent,
      resolve: {
        data: CrudService
      },
  },
  {
      path: 'form',
      component: CrudFormComponent,
      resolve: {
        data: CrudService
      }
  },
  {
    path: 'form/:id',
    component: CrudFormComponent,
    resolve: {
      data: CrudService
    }
},
];


@NgModule({
  declarations: [
    CrudComponent,
    CrudFormComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FuseAlertModule,
    MatProgressBarModule,
    SharedModule,
    FuseAlertModule,
    FuseConfirmationModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
  ]
})
export class CrudModule { }
