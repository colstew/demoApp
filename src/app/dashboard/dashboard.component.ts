import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.customerService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

  heroes: Hero[] = [];

}
