import { Component, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { CocktailService } from '../services/cocktail.service';
import { animate, animateChild, group, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.css'],
  animations: [
    trigger('comeAndLeave', [
      transition(':enter', [
        query('.card', [
          style({
            scale: '0',
            transform: 'rotateY(180deg)',
            opacity: '0'
          }), 
          animate('1s ease-out', 
            style({
              scale: '1',
              transform: 'rotateY(0deg)',
              opacity: '100%'
            })
          )
        ])
      ]),
      transition(':leave', [
        query('.card', 
          animate('0.5s ease-out', 
            style({
              transform: 'translateY(90%)',
              opacity: '0'
            })
          )
        )
      ])
    ])
  ]
})
export class CocktailListComponent implements OnInit {
  cardList: Cocktail[] = [];
  nbCocktail: number = 3;

  constructor(private service: CocktailService){}

  ngOnInit(): void{
    for (let index = 0; index < this.nbCocktail; index++) {
      this.formatCocktail();
    }
  }

  formatCocktail(): void {
    this.service.getCocktail().subscribe({
      next: value => {
        value = value['drinks'][0];
        let strIngredients: string[] = Object
              .keys(value)
              .filter(item => value[item] !== null)
              .filter(item => item.startsWith("strIngredient"))
              .map(o => value[o]);

        let strMeasures: string[] = Object
              .keys(value)
              .filter(item => value[item] !== null)
              .filter(item => item.startsWith("strMeasure"))
              .map(o => value[o]);

        this.cardList.push(new Cocktail(value['idDrink'], value['strDrink'], value['strAlcoholic'], value['strGlass'], value['strInstructions'], value['strDrinkThumb'], strIngredients, strMeasures));
      }
    });
  }

  async onReload(): Promise<void> {
    this.cardList = [];
    await new Promise(r => setTimeout(r, 1000));
    this.ngOnInit();
  }
}
