import { Component, Input } from '@angular/core';
import { BackendService } from '../../backend/services/backend.service';

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
  @Input() public priceId: string;
  @Input() public type: string = 'TYPE';
  @Input() public prices: { currency: string, value: string }[];

  constructor(private readonly backendService: BackendService) {

  }

  public async buy(): Promise<void> {
    const url = await this.backendService.getCheckout(this.priceId);
    window.open(url, '_blank');
  }
}
