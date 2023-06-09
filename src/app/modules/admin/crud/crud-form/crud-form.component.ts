import { Component ,Inject,OnInit} from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CrudService } from '../crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-crud-form',
  templateUrl: './crud-form.component.html',
  styleUrls: ['./crud-form.component.scss']
})
export class CrudFormComponent implements OnInit{

  myForm: FormGroup;
  // dataOne : any;
  _data: any = {
    productName: '',
    subcategoryName: '',
    typeName: '',
    subcategoryId: '',
   
  }
  // selectedFile: File;
  _element: any;

  constructor(

    private _CrudService: CrudService,
    private _fuseConfirmationService: FuseConfirmationService,
    public dialogRef: MatDialogRef<CrudFormComponent>,
    private _formBuilder : FormBuilder,
    private _matSnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){

    this._data = this.data; 
    
  }


  ngOnInit():void {

  if(this._data) {

    // this._data.subcategoryName
    // this._data.productName
    // this._data.typeName
    // this._data.remark
    // this._data.status


  this.myForm = this._formBuilder.group({
    subcategoryName: [this._data.subcategoryName, Validators.required],
    productName: [this._data.productName, Validators.required],
    typeName: [this._data.typeName, Validators.required],
    subcategoryId: [this._data.subcategoryId, Validators.required],
    // status: ['this.value.status', Validators.required],
     }); 
        
   } else {
    console.log("this.value.subcategoryName",this._data);
    this.myForm = this._formBuilder.group({
      subcategoryName: ['', Validators.required],
      productName: ['', Validators.required],
      typeName: ['', Validators.required],
      subcategoryId: ['', Validators.required],
      // status: ['', Validators.required],
   });
   }
  }


  onNoClick(result: boolean = false): void {
   // close dialog
    this.dialogRef.close(result);
    }

  formSubmit(): void {
    if (this._data) {
      const dialogRef = this._fuseConfirmationService.open({
        title: 'Are you sure you want to update this Bundle?',
        icon: {
          color: 'primary'
        },
        actions: {
          confirm: {
            label: 'Confirm',
            color: 'primary'
          }
        }
      });

      
      dialogRef.afterClosed().subscribe((result) => {
        
        if (result === 'confirmed') {
          
          const newData = this.myForm.value;
          newData.id = this._data.productId;
          console.log("newData",newData);
          // call service api
          this._CrudService.updateData(newData).subscribe({
            next: (res) => {
              
              // alert sucess messge

              console.log("newData",newData);
              this.dialogRef.close(true);
              this._matSnackBar.open('Edit Successfully.', '', {
                duration: 3000
              });
            },
            error: (err) => {
              // alert error msg
              this._matSnackBar.open(err.error.message, '', {
                duration: 3000
              });
            },
            complete: () => {
              console.log("is complete",this._data)
              //call funsction close dialog
              this.dialogRef.close(true);
              this.onNoClick();
            }
          });
        }
        
      });

    } else {
      // call service api
      this._CrudService.addData(this.myForm.value).subscribe({
        next: (res) => {
          // alert sucess messge
          console.log(res)
          this.dialogRef.close(true);
          this._matSnackBar.open('Added Successfully.', '', {
            duration: 3000
          });
          // this._matSnackBar.open('Added Successfully.', '', {
          //   duration: 3000
          // });

        },
        error: (err) => {
          // alert error msg
          this._matSnackBar.open(err.error.message, '', {
            duration: 3000
          });
        },
        complete: () => {
          //call funsction close dialog
          this.onNoClick(true);
        }

      });
    }
  }
}


