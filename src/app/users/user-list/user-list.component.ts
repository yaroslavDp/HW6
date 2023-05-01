import { Component } from '@angular/core';
import { IUser } from '../models/user.model';
import { userService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  userList: IUser[] = [];
  searchQuery: string = '';
  private usersSub: Subscription;
  private searchSub: Subscription;
  constructor(private userService: userService){
    this.usersSub = Subscription.EMPTY;
    this.searchSub = Subscription.EMPTY;
  }


  ngOnInit(): void{
    this.userList = this.userService.getUserData();
    this.usersSub = this.userService.usersChanged.subscribe(
      (users: IUser[]) => {
        this.userList = users;
      }
    )
    this.searchSub = this.userService.searchTermChanged.subscribe(
      (data) => {
        this.searchQuery = data;
      }
    )

  }
  selectCard(user: IUser){
    this.userService.selectUser(user);
  }
  ngOnDestroy(): void {
    this.usersSub.unsubscribe();
    this.searchSub.unsubscribe();
}
}
