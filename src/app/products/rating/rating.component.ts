import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() rating;
  @Output() ratingToparent:EventEmitter<string>=new EventEmitter();

  rating_arr: any=[];

  constructor() { }

  ngOnInit() {
    
  this.rating_arr=Array(Math.round(this.rating));
  
}
sendRatingToParent(){
  this.ratingToparent.emit('Rating Value = '+this.rating);
}
}
