﻿import { Component, OnInit, ViewChild  }  from '@angular/core';



import { IUser } from './user'
import { UserService } from './user.service';
import {AddUserComponent} from './user-add.component';

@Component({
    templateUrl: 'app/users/user-list.component.html',
    styleUrls: ['app/users/user-list.component.css'] 

})
export class UserListComponent implements OnInit {
    pageTitle: string = 'Users';
    listFilter: string = '';
    errorMessage: string;
    users: IUser[];

    constructor(private _userService: UserService) {

    }

    @ViewChild(AddUserComponent) addUserComponent: AddUserComponent;

    addUser(userId: number){
        this.addUserComponent.init(userId);
        //this.addUserComponent.show();
    }


    deleteUser(userId: number){
        this._userService.deleteUser(userId);
    }

    ngOnInit(): void {
        this._userService.getUsers()
            .subscribe(
            users => this.users = users,
            error => this.errorMessage = <any>error);
    }


}