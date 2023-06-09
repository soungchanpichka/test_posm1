import { AfterViewInit, Component, ViewChild  , ElementRef, OnDestroy, OnInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CrudService } from './crud.service';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog } from '@angular/material/dialog';
import { CrudFormComponent } from './crud-form/crud-form.component';



@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit, AfterViewInit{
  [x: string]: any;
  displayedColumns: string[] = [ 'productId', 'subcategoryName' , 'productName', 'typeName', 'subcategoryId', 'action' ];
  dataSource = new MatTableDataSource<any>();
  private _unsubscribeAll: Subject<any>  = new Subject();



  @ViewChild('filter', {static: true}) filter: ElementRef;
  @ViewChild(MatPaginator) private paginator: MatPaginator;

  _data: any[];
  constructor(
    private _CrudService: CrudService,
    private _fuseConfirmationService: FuseConfirmationService,
    private _matSnackBar: MatSnackBar,
    private dialog: MatDialog,
    
    
  ) {
    this._CrudService = _CrudService;
      this._data = this._CrudService.products;
      console.log(this._data)
      this.dialogRef = dialog;
      // console.log("want to check id",this._data.id)
  }

  ngAfterViewInit() {
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
      }
  }

  // ngOnDestroy(): void {
  //   this._unsubscribeAll.next();
  //   this._unsubscribeAll.complete();
  // }

  ngOnInit(): void {
    console.log("log ngOninit",this._CrudService)
    this.dataSource.data = this._CrudService.products;

    
    fromEvent(this.filter.nativeElement, 'keyup')
    .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(150),
        distinctUntilChanged()
    )
    .subscribe(() => {
        if ( !this.dataSource )
        {
            return;
        }

        this.dataSource.filter = this.filter.nativeElement.value;
    });
  }

  deleteConfirm(_data: any): void {
    // Open the confirmation and save the reference
    console.log(this.deleteConfirm)
    const dialogRef = this._fuseConfirmationService.open();
  
    // Subscribe to afterClosed from the dialog reference
    dialogRef.afterClosed().subscribe((result) => {
        if(result === 'delete') {
          this._CrudService.deleteData({productId : _data}).subscribe(() => {
            // refresh
            this._CrudService.getAllProducts().then((res) => {
              console.log(res)
              this.dataSource.data = res;
            });
            this._matSnackBar.open('Product successfully deleted.', '', {
                duration: 3000,
                verticalPosition: 'top'
            });
          });
        }
    });
  }

//   openDialog(): void{

//     const dialogRef = this.dialog.open(CrudFormComponent,{
//     width: '500px',
//     disableClose: true,
//     });
    
//    dialogRef.afterClosed().subscribe(result => {
    
//   console.log('The dialog was closed');
    
//   // this._bundleService.getBundle().then(resData => {
    
//   //   // this for assign new data
    
//   //   console.log('getAPI1');
    
//   //   this.dataSource.data = resData.DataSet;
    
//   //    });
    
//    });
    
// }

btnAdd(): void {
 const dialogRef = this.dialog.open(CrudFormComponent, {
    width: '500px',
   disableClose: true,

  });
    dialogRef.afterClosed().subscribe((result) => {
      this._CrudService.getAllProducts().then((resData) => {
            this.dataSource.data = resData;
   });
  });
}

btnEdit(_data: any){

  // console.log(element)
  const dialogRef =  this.dialog.open(CrudFormComponent, {
    width: '500px',
   disableClose: true,

   data: _data
  }
  );

  dialogRef.afterClosed().subscribe((result) => {
    this._CrudService.getAllProducts().then((resData) => {
    this.dataSource.data = resData;
 })
 .catch((error)=>{
  console.log(error);
 })
});
  

}


  
}


