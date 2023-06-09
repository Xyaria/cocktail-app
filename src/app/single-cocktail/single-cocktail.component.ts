import { transition, animate, style, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { CocktailService } from '../services/cocktail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CocktailExtended } from '../models/cocktail-extended.model';

@Component({
  selector: 'app-single-cocktail',
  templateUrl: './single-cocktail.component.html',
  styleUrls: ['./single-cocktail.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({
          opacity: '0'
        }),
        animate('0.5s 1s ease-in', 
          style({
            opacity: '100%'
          }))
      ])
    ])
  ]
})
export class SingleCocktailComponent implements OnInit{
  id!: number;
  cocktail: Cocktail = new Cocktail(0, '', '', '', '../../assets/placeholder.jpg', [''], ['']);
  cocktailExtended: CocktailExtended = new CocktailExtended('', [''], '', '', new Date());

  constructor(private service: CocktailService,
              private route: ActivatedRoute,
              private router: Router){}

  ngOnInit(): void{
    this.formatCocktail();
  }

  private formatCocktail(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.getOneCocktail(this.id).subscribe({
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

        this.cocktail = new Cocktail(value['idDrink'], value['strDrink'], value['strAlcoholic'], value['strGlass'], value['strDrinkThumb'] + '/preview', strIngredients, strMeasures);
        this.cocktailExtended = new CocktailExtended(value['strCategory'], value['strTags'], value['strIBA'], value['strInstructions'], new Date(value['dateModified'].replace(" ", "T")));
      }
    });
  }

  onBackToList() {
    this.router.navigateByUrl('/cocktail');
  }
}
