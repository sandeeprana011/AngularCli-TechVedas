import {Component, OnInit} from "@angular/core";

export declare var jQuery: any;


@Component({
  selector: 'app-website-container',
  templateUrl: './website-container.component.html',
  styleUrls: ['./website-container.component.css']
})
export class WebsiteContainerComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    jQuery('.carousel.carousel-slider').carousel({full_width: true, time_constant: 1000});
    setInterval(() => this.next(), 6000);
  }

  private next() {
    jQuery('.carousel').carousel('next');

  }
}
