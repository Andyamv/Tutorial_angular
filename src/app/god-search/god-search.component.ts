import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { God } from '../god';
import { GodService } from '../god.service';

@Component({
  selector: 'app-god-search',
  templateUrl: './god-search.component.html',
  styleUrls: ['./god-search.component.css']
})

export class GodSearchComponent implements OnInit {
  gods$: Observable<God[]>
  private searchTerms = new Subject<string>();
  
  constructor(private godService: GodService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.gods$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.godService.searchGods(term)),
    );
  }

}
