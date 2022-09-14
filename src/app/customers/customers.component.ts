import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { MessageService } from '../message.service';
import { Hero } from '../hero';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor(private customerService: CustomerService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.getHeroes();
  }
  getHeroes(): void {
    this.customerService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }
  
  heroes: Hero[] = [];
  selectedHero?: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }
}
