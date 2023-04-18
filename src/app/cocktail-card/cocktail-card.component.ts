import { Component, Input, OnInit } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { trigger, transition, animate, style, state } from '@angular/animations';


@Component({
  selector: 'app-cocktail-card',
  templateUrl: './cocktail-card.component.html',
  styleUrls: ['./cocktail-card.component.css'],
  animations: [
    trigger('openDetail', [
      state('close', style({
        height: '0'
      })),
      state('open', style({
        height: '200px'
      })),
      transition('close <=> open', [
        animate('0.5s')
      ])
    ]),
    trigger('leaveDetail', [
      transition('* => void', [
        animate('0.1s', 
          style({
            height: '0'
          })
        )
      ])
    ])
  ]
})
export class CocktailCardComponent implements OnInit{
  @Input() card!: Cocktail;
  color: number[] = [0, 0, 0];
  show: boolean = false;
  detailState: 'open' | 'close' = 'close';

  ngOnInit(): void {
    for (let index = 0; index < 3; index++) {
      this.color[index] += Math.random()*20-10
      if(this.color[index] < 0) {
        this.color[index] = 255;
      }
      if(this.color[index] > 255) {
        this.color[index] = 0;
      }
    }
  }

  onToggle(): void {
    this.detailState = this.detailState === 'close' ? 'open' : 'close';
    this.show = !this.show;
  }
}
