import { Component, OnInit } from '@angular/core';
import { God } from '../god';
import { GodService } from '../god.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  gods: God[] = [];

  constructor(private godService: GodService) { }

  ngOnInit() {
    this.getGods();
  }
  
  getGods(): void {
    this.godService.getGods()
      .subscribe(gods => this.gods = gods.slice(1, 5));
  }


}
