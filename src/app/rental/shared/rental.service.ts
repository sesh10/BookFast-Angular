import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';


@Injectable()
export class RentalService {
    private rentals: Rental[] = [{
        id: "1",
        title: 'Central Apartment',
        city: 'Mumbai',
        street: 'Dalal Street',
        category: 'Apartment',
        image: 'http://via.placeholder.com/350x250',
        bedrooms: 2,
        description: 'Very nice and spacious apartment',
        rate: 50,
        shared: false,
        createdAt: '1/6/2020'
      },
      {
        id: "2",
        title: "Central Apartment",
        city: "New York",
        street: "Times Sqaure",
        category: "apartment",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 3,
        description: "Very nice apartment",
        rate: 34,
        shared: false,
        createdAt: "24/12/2017"
      },
      {
        id: "3",
        title: "Central Apartment 2",
        city: "San Francisco",
        street: "Main street",
        category: "condo",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 2,
        description: "Very nice apartment",
        rate: 12,
        shared: true,
        createdAt: "24/12/2017"
      },
      {
        id: "4",
        title: "Central Apartment 3",
        city: "Bratislava",
        street: "Hlavna",
        category: "condo",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 2,
        description: "Very nice apartment",
        rate: 334,
        shared: true,
        createdAt: "24/12/2017"
      },
      {
        id: "5",
        title: "Central Apartment 4",
        city: "Berlin",
        street: "Haupt strasse",
        category: "house",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 9,
        description: "Very nice apartment",
        rate: 33,
        shared: true,
        createdAt: "24/12/2017"
    }];

    public getRentalById(rentalId: string): Observable<Rental> {
      return new Observable<Rental>((observer) => {
        setTimeout(() => {
          const foundRental = this.rentals.find((rental) => {
            return rental.id == rentalId;
          })

          observer.next(foundRental);
        }, 500);
      });
    }

    public getRentals(): Observable<Rental[]> {
        return new Observable<Rental[]>((observer) => {
            setTimeout(() => {
                observer.next(this.rentals);
            }, 1000);
        });
    }
}