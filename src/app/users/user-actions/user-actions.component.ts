import { Component } from '@angular/core';
import { userService } from '../services/user.service';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.css']
})
export class UserActionsComponent {

  searchQuery:string = '';
  selectedUsers: number = 0;
  isSelectedAll: boolean = false;
  sortOrder: string = 'asc';
  private usersSub: Subscription;
  constructor(private userService: userService){
    this.usersSub = Subscription.EMPTY;
  }
  ngOnInit(){
  this.usersSub = this.userService.usersChanged.subscribe((data) => {
    this.selectedUsers = data.filter((item) => item.checked === true).length;
  })
  }

  selectAll(){
    this.isSelectedAll = !this.isSelectedAll;
    this.userService.selectAllUsers(this.isSelectedAll);
  }
  deleteSelected(){
    this.userService.deleteUsers();
  }
  search(){
    this.userService.searhUser(this.searchQuery);
  }
  sort(){
    this.userService.sortUsers(this.sortOrder);
    this.sortOrder = (this.sortOrder ==  'asc') ? 'desc' : 'asc';
  }
  ngOnDestroy(){
    this.usersSub.unsubscribe()
  }
}
