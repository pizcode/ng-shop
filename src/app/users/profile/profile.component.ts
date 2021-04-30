import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private US:UserService) { }

  user:User;

  ngOnInit(): void {
    this.US.getLoginUser().subscribe(value=>{
      this.user = value['data'];
    });
  }

}
