import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stripe-product-item',
  templateUrl: './stripe-product-item.component.html',
  styleUrls: ['./stripe-product-item.component.scss']
})
export class StripeProductItemComponent {
  @Input() public title: string;
  @Input() public name: string;
  @Input() public description: string;
  @Input() public image: string;
  @Input() public type: string = 'TYPE';
}
