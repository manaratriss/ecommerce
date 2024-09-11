import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interface/product';

@Pipe({
  name: "search",
  standalone: true
})
export class SearchPipe implements PipeTransform {
  transform(products: Product[], word: string): any[] {
    return products.filter(product => {
      return product.title.toLowerCase().includes(word.toLowerCase());
    });
  }
}
