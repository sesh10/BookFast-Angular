import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../booking/shared/booking.service';
import { Booking } from 'src/app/booking/shared/booking.model';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';
import { RightPadPipe } from 'ngx-pipes';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})


export class ManageBookingComponent implements OnInit {

  bookings: Booking[] = [];
  booked: Booking;

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.bookingService.getUserBookings().subscribe(
      (bookings: Booking[]) => {
        this.bookings = bookings;
      },
      () => {

      }
    )
  }

  generatePdf(booked){
    this.booked = booked;

    const documentDefinition = { 
      content: [
        {
          text: 'BookFast Hotel Services Ltd.',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{text: 'User ID: ' + this.booked._id},
            {text: 'Hotel: ' + this.booked.rental.title + ', ' + this.booked.rental.street + ', ' + this.booked.rental.city},
            {text: 'Rental ID: ' + this.booked.rental._id},
            {text: 'Start Date: ' + moment(this.booked.startAt).format('DD-MM-YY')},
            {text: 'End Date : ' + moment(this.booked.endAt).format('DD-MM-YY')},
            {text: 'Total Price : Rs ' + this.booked.totalPrice},
            {text: 'Total Guests : ' + this.booked.guests},
            {text: 'Total Price : Rs ' + this.booked.totalPrice},
            {
              text: 'Booking holder signature',
              style: 'sign',
              margin: [0, 100, 0 , 10],
              alignment: 'right',
              italics: true
            },
            {qr: 'User ID: ' + this.booked._id + ', Rental ID : ' + this.booked.rental._id
                + ', Start Date: ' + moment(this.booked.startAt).format('DD-MM-YY') 
                + ', End Date: ' + moment(this.booked.endAt).format('DD-MM-YY'), fit : 100}
            ]]
        },
      ]
    }
    pdfMake.createPdf(documentDefinition).open();
  }

}
