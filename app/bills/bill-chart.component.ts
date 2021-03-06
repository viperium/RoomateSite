import {
    Component
} from '@angular/core';
import {
    IBill,
    BillCategory
} from './bill';
import {
    UserService
} from '../users/user.service';
import {
    IUser
} from '../users/user';

// webpack html imports
@Component({
    selector: 'bill-chart',
    templateUrl: 'app/bills/bill-chart.component.html',
    styleUrls: ['app/bills/bill-chart.component.css']
})
export class BillChartComponent {
    // lineChart
    public isVisible: boolean;
    private users: IUser[];
    public Mode: string;

    public lineChartData: Array < any > = [
        // [65, 59, 80, 81, 56, 55, 40],
        // [28, 48, 40, 19, 86, 27, 90]
    ];
    public lineChartLabels: Array < any > = [];
    public lineChartType: string = 'line';


    constructor(private _userService: UserService) {
        this._userService.getUsers().subscribe(
            users => this.users = users,
            error => console.log('[BillChartComponent: Ctor]' + error)
        );
    }

    public initializeByCategories(bills: IBill[]): void {
        let billsByCategory: IBill[][] = [];

        let minimumDate: Date = new Date();
        let maximumDate: Date = new Date(-8640000000000000);


        let totalBillsPerMonth: Array < Array < Array < number >>> = [];

        for (let i = 0; i < bills.length; i++) {
            let bill = bills[i];

            if (!bill) {
                continue;
            }

            if (!billsByCategory[bill.category]) {
                billsByCategory[bill.category] = [];
            }
            billsByCategory[bill.category].push(bill);

            if (bill.date < minimumDate) {
                minimumDate = bill.date;
            }
            if (bill.date > maximumDate) {
                maximumDate = bill.date;
            }

            if (!totalBillsPerMonth[bill.category]) {
                totalBillsPerMonth[bill.category] = [];
            }
            if (!totalBillsPerMonth[bill.category][bill.date.getFullYear()]) {
                totalBillsPerMonth[bill.category][bill.date.getFullYear()] = [];
            }


            if (!totalBillsPerMonth[bill.category][bill.date.getFullYear()][bill.date.getMonth()]) {
                totalBillsPerMonth[bill.category][bill.date.getFullYear()][bill.date.getMonth()] = bill.amount;
            } else {
                totalBillsPerMonth[bill.category][bill.date.getFullYear()][bill.date.getMonth()] += bill.amount;
            }


        }

        // Clear the array
        this.lineChartData.length = 0;

        // fill the gaps
        for (let category in totalBillsPerMonth) {

            if (category !== undefined) {
                let userData: number[] = new Array < number > ();

                for (let i = minimumDate.getFullYear(); i <= maximumDate.getFullYear(); i++) {
                    if (i !== undefined) {
                        for (let j = 1; j <= 12; j++) {
                            if (!totalBillsPerMonth[category][i][j]) {
                                userData.push(0);
                            } else {
                                userData.push(totalBillsPerMonth[category][i][j]);
                            }
                        }
                    }
                }


                let lineCategoryData: {
                    data: number[],
                    label: string
                } = {
                    data: [],
                    label: ''
                };
                lineCategoryData.data = userData;
                lineCategoryData.label = BillCategory[category];
                this.lineChartData.push(lineCategoryData);
            }
        }


        let labels: Array < string > = [];
        for (let i = minimumDate.getFullYear(); i <= maximumDate.getFullYear(); i++) {
            labels.push('Jan ' + i);
            labels.push('Feb ' + i);
            labels.push('Mar ' + i);
            labels.push('Apr ' + i);
            labels.push('May ' + i);
            labels.push('Jun ' + i);
            labels.push('Jul ' + i);
            labels.push('Aug ' + i);
            labels.push('Sep ' + i);
            labels.push('Oct ' + i);
            labels.push('Nov ' + i);
            labels.push('Dec ' + i);
        }

        this.lineChartLabels = labels;




    }

    public initializeByUsers(bills: IBill[]): void {
        let billsByUser: IBill[][] = [];

        let minimumDate: Date = new Date();
        let maximumDate: Date = new Date(-8640000000000000);


        let totalBillsPerMonth: Array < Array < Array < number >>> = [];

        for (let i = 0; i < bills.length; i++) {
            let bill = bills[i];

            if (!bill) {
                continue;
            }

            if (!billsByUser[bill.payerId]) {
                billsByUser[bill.payerId] = [];
            }
            billsByUser[bill.payerId].push(bill);

            if (bill.date < minimumDate) {
                minimumDate = bill.date;
            }
            if (bill.date > maximumDate) {
                maximumDate = bill.date;
            }

            if (!totalBillsPerMonth[bill.payerId]) {
                totalBillsPerMonth[bill.payerId] = [];
            }
            if (!totalBillsPerMonth[bill.payerId][bill.date.getFullYear()]) {
                totalBillsPerMonth[bill.payerId][bill.date.getFullYear()] = [];
            }


            if (!totalBillsPerMonth[bill.payerId][bill.date.getFullYear()][bill.date.getMonth()]) {
                totalBillsPerMonth[bill.payerId][bill.date.getFullYear()][bill.date.getMonth()] = bill.amount;
            } else {
                totalBillsPerMonth[bill.payerId][bill.date.getFullYear()][bill.date.getMonth()] += bill.amount;
            }


        }

        // Clear the array
        this.lineChartData.length = 0;

        // fill the gaps
        for (let payerId in totalBillsPerMonth) {
            if (payerId !== undefined) {
                let userData: number[] = new Array < number > ();


                for (let i = minimumDate.getFullYear(); i <= maximumDate.getFullYear(); i++) {
                    for (let j = 1; j <= 12; j++) {
                        if (!totalBillsPerMonth[payerId][i][j]) {
                            userData.push(0);
                        } else {
                            userData.push(totalBillsPerMonth[payerId][i][j]);
                        }
                    }
                }


                let lineUserData: {
                    data: number[],
                    label: string
                } = {
                    data: [],
                    label: ''
                };
                lineUserData.data = userData;
                lineUserData.label = this.getUserById(parseInt(payerId, 10));
                this.lineChartData.push(lineUserData);
            }
        }


        let labels: Array < string > = [];
        for (let i = minimumDate.getFullYear(); i <= maximumDate.getFullYear(); i++) {
            labels.push('Jan ' + i);
            labels.push('Feb ' + i);
            labels.push('Mar ' + i);
            labels.push('Apr ' + i);
            labels.push('May ' + i);
            labels.push('Jun ' + i);
            labels.push('Jul ' + i);
            labels.push('Aug ' + i);
            labels.push('Sep ' + i);
            labels.push('Oct ' + i);
            labels.push('Nov ' + i);
            labels.push('Dec ' + i);
        }

        this.lineChartLabels = labels;
    }



    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }


    getUserById(userId: number): string {
        if (!this.users) {
            return 'No User Found';
        }
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].userId === userId) {
                return this.users[i].userName;
            }
        }

        return 'No User Found';
    }

    public show() {
        this.isVisible = true;

    }


    public hide() {

        this.isVisible = false;
    }
}
