import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Booking } from 'src/app/booking/shared/booking.model';
import { HelperService } from '../../../common/service/helper.service';
import * as moment from 'moment';
import { Rental } from '../../shared/rental.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from '../../../booking/shared/booking.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DaterangepickerComponent } from 'ng2-daterangepicker';

@Component({
  selector: 'app-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})


export class RentalDetailBookingComponent implements OnInit {

  @Input() rental: Rental;
  @ViewChild(DaterangepickerComponent) private picker: DaterangepickerComponent;

  newBooking: Booking;
  modalRef: any;

  daterange: any = {};
  bookedOutDates: any[] = [];
  errors: any[] = [];

  options: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    opens: 'left',
    isInvalidDate: this.checkForInvalidDates.bind(this),
    autoUpdateInput: false
  };

  constructor(private helper: HelperService, private modalService: NgbModal, private bookingService: BookingService,
              private toastr: ToastrManager) {

              }

  ngOnInit(): void {
    this.newBooking = new Booking();
    this.getBookedOutdates();
  }

  private checkForInvalidDates(date) {
    return this.bookedOutDates.includes(this.helper.formatBookingDate(date)) || date.diff(moment(), 'days') < 0;
  }

  private getBookedOutdates() {
    const bookings: Booking[] = this.rental.bookings;

    if (bookings && bookings.length > 0) {
      bookings.forEach((booking: Booking) => {
        const dateRange = this.helper.getBookingRangeOfDates(booking.startAt, booking.endAt);
        this.bookedOutDates.push(...dateRange);
      });
    }
  }

  private addNewBookDates(bookingData: any) {
    const dateRange = this.helper.getBookingRangeOfDates(bookingData.startAt, bookingData.endAt);
    this.bookedOutDates.push(...dateRange);
  }

  private resetDatepicker() {
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('');
  }

  openConfirmModal(content) {
    this.errors = [];
    this.modalRef = this.modalService.open(content, { size: 'lg' });
  }

  createBooking() {
    this.newBooking.rental = this.rental;

    this.bookingService.createBooking(this.newBooking).subscribe(
      (bookingData: any) => {
        this.newBooking = new Booking();
        this.modalRef.close();
        this.resetDatepicker();
        this.addNewBookDates(bookingData);
        this.toastr.successToastr('Booking Successful! Please check booking details in the manage section', 'Success!');
      },
      (errorResponse: any) => {
        this.errors = errorResponse.error.errors;         
      }
    );
  }

  selectedDate(value: any, datepicker: any) {
    this.options.autoUpdateInput = true;
    this.newBooking.startAt = this.helper.formatBookingDate(value.start);
    this.newBooking.endAt = this.helper.formatBookingDate(value.end);
    this.newBooking.days = -(value.start.diff(value.end, 'days')) + 1;
    this.newBooking.totalPrice = this.newBooking.days * this.rental.rate;
    this.newBooking.guests;

  }
}
