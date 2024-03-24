import { Component, OnInit } from '@angular/core';
import { loadingSub } from "src/app/utils/utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    loadingSub.subscribe(loading => this.loading = loading);
  }

  protected portfolio = 'Portfolio';
  protected name = 'Dimitar Ivanov Dimitrov'
  protected loading: boolean = false;
}
