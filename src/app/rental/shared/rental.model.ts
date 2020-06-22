import { Booking } from 'src/app/booking/shared/booking.model';

export class Rental {
    _id: string;
    title: string;
    city: string;
    street: string;
    category: string;
    image: string;
    bedrooms: number;
    description: string;
    rate: number;
    shared: boolean;
    createdAt: string;
    bookings: Booking[];
}