import { Injectable } from '@angular/core';
import { Subject, catchError } from 'rxjs';
import { IUser } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class userService {
  private userData: IUser[] = [];
  usersChanged = new Subject<IUser[]>();
  searchTermChanged = new Subject<string>();
  usersSelected: IUser[] = [];
  apiUrl = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient){

  }
  getUserData() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
      const transformedData = data.map((item) => {
        const [firstname, lastname] = item.name.split(" ");
        return { id: item.id, firstname: firstname, lastname: lastname, email: item.email, phone: item.phone}
      })
      this.userData.push(...transformedData);
    });
    return this.userData
  }

  selectUser(user: IUser) {
    this.userData = this.userData.map((item) => {
        if(item.id === user.id) {
            return {...item, checked: !item.checked};
        }
        return item;
    })
    this.usersChanged.next(this.userData.slice());
  }

  selectAllUsers(isSelectedAll:boolean) {
    if(isSelectedAll){
      this.userData = this.userData.map((item) => {
        return {...item, checked: true}
    })
    } else{
      this.userData = this.userData.map((item) => {
        return {...item, checked: false}
    })
    }
    this.usersChanged.next(this.userData.slice());
  }

  searhUser(searchTerm: string){
    this.searchTermChanged.next(searchTerm);
  }
  sortUsers(order:string){
    if(order === 'asc'){
      this.userData = this.userData.sort((a,b)=>b.lastname.localeCompare(a.lastname))
    } else {
      this.userData = this.userData.sort((a,b)=>b.lastname.localeCompare(a.lastname)).reverse();
    }
    this.usersChanged.next(this.userData.slice());
  }

  addUser(user: IUser){
    this.http.post(this.apiUrl, user).subscribe((data: any) => {
      this.userData.push({id: data.id, firstname: data.firstname, lastname: data.lastname, email: data.email, phone: data.phone});
      this.usersChanged.next(this.userData.slice());
    })
  }
  deleteUsers() {
    this.usersSelected = this.userData.filter((item) => item.checked)
    const id = this.usersSelected[0].id;
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.userData = this.userData.filter((item) => !item.checked)
      this.usersChanged.next(this.userData.slice());
    })
  }
}
