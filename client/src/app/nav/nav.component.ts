import { User } from './../_models/user';
import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  // loggedIn: boolean;
  // currentUser$: Observable<User>;

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    // this.getCurrentUser();
    // this.currentUser$ = this.accountService.currentUser$;
  }

  login(): void{
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
      // this.loggedIn = true;
    }, error => {
      console.log(error);
    }
    );
  }

  // tslint:disable-next-line: typedef
  logout(){
    this.accountService.logout();
    // this.loggedIn = false;
  }

  // tslint:disable-next-line: typedef
/*   getCurrentUser(){
    this.accountService.currentUser$.subscribe(user => {
      this.loggedIn = !!user;
    }, error => {
      console.log(error);
    });
  } */

}
