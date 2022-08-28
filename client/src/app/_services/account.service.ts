import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';


@Injectable({
  providedIn: 'root'
})

export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  login(model: any){
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user){
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSource.next(user);
        }
      })
    );
  }

  // tslint:disable-next-line: typedef
  register(model: any){
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user){
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSource.next(user);
        }
        // return user;
      })
    );
  }



  // tslint:disable-next-line: typedef
  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

  logout(): void{
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}


/* export class AccountService {
  baseUrl = 'https://localhost:5001/api/';


  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  login(model: any){
    const sub = new ReplaySubject(3);

    sub.next(1);
    sub.next(2);
    sub.subscribe(console.log); // OUTPUT => 1,2
    sub.next(3); // OUTPUT => 3
    sub.next(4); // OUTPUT => 4
    sub.subscribe(console.log); // OUTPUT => 2,3,4 (log of last 3 values from new subscriber)
    sub.next(5); // OUTPUT => 5,5 (log from both subscribers)

    return this.http.post(this.baseUrl + 'account/login', model);

  }

  logout(): void{
    localStorage.removeItem('user');
  }
} */


/* export class AccountService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  login(model: any){
    const subject = new ReplaySubject(2);

    // subscriber 1
    subject.subscribe((data) => {
      console.log('Subscriber A:', data);
    });
    subject.next(Math.random());
    subject.next(Math.random());
    subject.next(Math.random());

    // subscriber 2
    subject.subscribe((data) => {
    console.log('Subscriber B:', data);
    });

    // subscriber 3
    subject.subscribe((data) => {
      console.log('Subscriber C:', data);
      });

    // subscriber 4
    subject.subscribe((data) => {
      console.log('Subscriber D:', data);
      });

    subject.next(Math.random());

    // subscriber 5
    subject.subscribe((data) => {
      console.log('Subscriber E:', data);
      });

    return this.http.post(this.baseUrl + 'account/login', model);
  }
} */
