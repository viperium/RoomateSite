import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Bill, IBill, BillCategory } from './bill';


@Injectable()
export class BillService {
    private _billsUrl = 'api/bills/bills.json';

    constructor(private _http: Http) { }

    getBills(): Observable<IBill[]> {
        return this._http.get(this._billsUrl)
            .map((response: Response) => <IBill[]>response.json())
            .map(this.specialParsing)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

     private specialParsing(res: any): IBill[] {
         if (!res) {
             return [];
         }

         res.forEach((d: IBill) => {
             d.date = new Date(d.date.toString());
         });
         return res;
     }

    getBill(id: number): Observable<IBill> {
        return this.getBills()
            .map((bills: IBill[]) => bills.find(p => p.billId === id));
    }

    putBill(title: string, category: BillCategory, creator: number, amount: number, date: string, additionalInfo: string): IBill {

        let maxId: number;
        this.getBills()
            .map((bills: IBill[]) => maxId = Math.max.apply(Math, bills.map(function(o) { return o.billId; })));

        return new Bill((maxId + 1), title, category, creator, amount, new Date(date), additionalInfo);
    }

    addOrUpdateBill(bill: IBill): IBill {

        if (bill.billId === -1) {
            let maxId: number;
            this.getBills().map((bills: IBill[]) => maxId = Math.max.apply(Math, bills.map(function (o) { return o.billId; })));

            bill.billId = maxId + 1;
        }

        console.log('Adding or Updating bill ' + bill.billId);

        return bill;
    }

    deleteBill(billId: number) {
        console.log('Deleting Bill ' + billId);
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
