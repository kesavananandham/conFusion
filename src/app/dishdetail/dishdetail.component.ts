import { Component, OnInit, Input, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  errMess: string;

  commentForm: FormGroup;
  comment: Comment;

  formErrors = {
    author: '',
    rating: '',
    comment: '',
  };

  validationMessages = {
    'author': {
      'required': 'Name is required',
      'minlength': 'Name must be at least 2 characters long.',
    },
    'comment': {
      'required': 'Comment is required'
    }
  };

  getIcon(rating) {
    let icon;
    switch (rating) {
      case 1:
        icon = 'sentiment_very_disappointed';
        break;
      case 2:
        icon = 'sentiment_dissatisfied';
        break;
      case 3:
        icon = 'sentiment_neutral';
        break;
      case 4:
        icon = 'sentiment_satisfied';
        break;
      case 5:
        icon = 'sentiment_very_satisfied';
        break;
    }
    return icon;
  }

  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder, @Inject('BaseURL') private BaseURL) {
    this.createForm();
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: [5, []],
      comment: ['', [Validators.required]]
    });

    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds, errmess => this.errMess = <any>errmess);
    this.route.params
      .switchMap((params: Params) => this.dishService.getDish(+params['id']))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); }, errmess => this.errMess = <any>errmess);
  }

  setPrevNext(dishId: number) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    var d = new Date();
    this.comment = this.commentForm.value;
    // add current date to the form
    this.comment.date = d.toISOString();
    this.dish.comments.push(this.comment);
    console.log(this.comment);

    // while reset, set rating as 5 as default
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
  }

}
