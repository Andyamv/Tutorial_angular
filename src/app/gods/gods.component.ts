import { Component, OnInit } from '@angular/core';
import { God } from '../god';
import { GodService } from '../god.service';

@Component({
  selector: 'app-gods',
  templateUrl: './gods.component.html',
  styleUrls: ['./gods.component.css']
  
})

export class GodsComponent implements OnInit {
  
  gods: God[];
  
  constructor(private godService: GodService) { }
 
  ngOnInit() 
  {
    this.getGods();
  }

  getGods(): void {
      this.godService.getGods()
          .subscribe(gods => this.gods = gods);
    }

  add(name: string): void {
      name = name.trim();
      if (!name) { return; }
      this.godService.addGod({ name } as God)
        .subscribe(god => {
          this.gods.push(god);
        });
    }
   
    delete(god: God): void {
      this.gods = this.gods.filter(h => h !== god);
      this.godService.deleteGod(god).subscribe();
    }
  
}
