import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BackendService } from '../../backend/services/backend.service';
import { ICreateProductArgs } from '../models/create-product-args.interface';
import { IProduct } from '../models/product.interface';

@Component({
  selector: 'app-add-stripe-product',
  templateUrl: './add-stripe-product.component.html',
  styleUrls: ['./add-stripe-product.component.scss']
})
export class AddStripeProductComponent {
  public isLoading: boolean = false;

  public formItems = [
    { type: 'text', label: 'name', control: new FormControl() },
    { type: 'text', label: 'description', control: new FormControl() },
    { type: 'text', label: 'externalId', control: new FormControl() },
    { type: 'text', label: 'image', control: new FormControl() },
    { type: 'text', label: 'shippable', control: new FormControl() },
    { type: 'text', label: 'height', control: new FormControl() },
    { type: 'text', label: 'length', control: new FormControl() },
    { type: 'text', label: 'weight', control: new FormControl() },
    { type: 'text', label: 'width', control: new FormControl() },
    { type: 'text', label: 'currency', control: new FormControl() },
    { type: 'text', label: 'value', control: new FormControl() },
    { type: 'text', label: 'currencies', control: new FormControl(), hint: '(\d+(.\d)* [a-zA-Z]{3})(; (\d+(.\d)* [a-zA-Z]{3}))*' },
  ];

  constructor(private readonly backendService: BackendService) {

  }

  public onSaveClick(): void {
    this.isLoading = true;

    const product: ICreateProductArgs = this.formItems.filter(x => x.label != 'currencies')
      .reduce((prev, curr) => {
        prev[curr.label] = curr.control.value;

        return prev;
      }, { currencies: [] }) as any;

    const currencies = this.formItems.find(x => x.label == 'currencies')!.control.value;

    if (currencies) {
      product.currencies = currencies.split(';')
      .map(x => x.split(' ').map(y => y.trim()).filter(y => !!y))
      .map(x => {
        return {
          currency: x[1].trim(),
          value: x[0].trim()
        };
      });
    }

    this.backendService.createProduct(product).then(x => {
      console.log('ok');
    })
    .catch(x => {
      console.log('err', x);
    })
    .finally(() => {
      this.isLoading = false;
    });
  }
}
