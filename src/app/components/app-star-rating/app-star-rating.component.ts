import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './app-star-rating.component.html',
  styleUrls: ['./app-star-rating.component.scss']
})
export class AppStarRatingComponent {
  @Input() rating: number = 0;
  @Input() readonly: boolean = true;
  @Input() size: string = '24px';
  @Input() activeColor: string = '#534d7a';
  @Input() defaultColor: string = 'cadetblue';

  @Output() ratingChange = new EventEmitter<number>();

  get stars(): number[] {
    return [1, 2, 3, 4, 5];
  }

  setRating(value: number) {
    if (!this.readonly) {
      this.rating = value;
      this.ratingChange.emit(value);
    }
  }
}
