import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish:Dish;

    dishIds: number[];
  prev: number;
  next: number;

  getIcon(rating) {
    let icon;
    switch (rating) {
      case 1:
        icon = "sentiment_very_disappointed";
        break;
      case 2:
        icon = "sentiment_dissatisfied"
        break;
      case 3:
        icon = "sentiment_neutral";
        break;
      case 4:
        icon = "sentiment_satisfied"
        break;
      case 5:
        icon = "sentiment_very_satisfied";
        break;
    }
    return icon;
  }

  constructor(private dishService:DishService,
          private route: ActivatedRoute,
          private location: Location) { }

  ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .switchMap((params: Params) => this.dishService.getDish(+params['id']))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

    setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

}
