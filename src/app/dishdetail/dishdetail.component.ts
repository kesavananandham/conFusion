import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  @Input()
  dish:Dish;

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

  constructor() { }

  ngOnInit() {
  }

}
