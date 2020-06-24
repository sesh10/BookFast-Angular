import { Component, OnInit } from '@angular/core';
import { RentalService } from '../../rental/shared/rental.service';
import { Rental } from 'src/app/rental/shared/rental.model';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-rental',
  templateUrl: './manage-rental.component.html',
  styleUrls: ['./manage-rental.component.scss']
})
export class ManageRentalComponent implements OnInit {

  rentals: Rental[];
  rentalDeleteIndex: number;

  constructor(private rentalService: RentalService, private toastr: ToastrManager) { }

  ngOnInit(): void {
    this.rentalService.getUserRentals().subscribe(
      (rentals: Rental[]) => {
        this.rentals = rentals;
      },
      () => {

      }
    )
  }

  deleteRental(rentalId: string) {
    this.rentalService.deleteRental(rentalId).subscribe(
      () => {
        this.rentals.splice(this.rentalDeleteIndex, 1);
        this.rentalDeleteIndex = undefined;
        this.toastr.successToastr('Rental deleted successfully!', 'Success!');
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastr.errorToastr(errorResponse.error.errors[0].detail, 'Failed!')
        
      }
    )
  }

}
