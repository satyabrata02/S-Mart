import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'S-Mart';
  products: any[] = [];
  categories: { [key: string]: any[] } = {};
  oneproduct: any[] = [];
  itemActive = 0;
  intervalId: any;
  
  constructor(private titleService: Title, private as:ApiService){

    this.as.getProducts().subscribe((data:any) => {
      this.products = data.products
      console.log(this.products)

      const firstProductsByCategory: { [key: string]: any } = {};
      
      this.products.forEach((product: any) => {
        const category = product.category;
        if (!firstProductsByCategory[category]) {
          // If not, store this product as the first product of this category
          firstProductsByCategory[category] = product;
        }
      });
      //console.log('First product of each category:', firstProductsByCategory);

      this.oneproduct = Object.values(firstProductsByCategory);
      console.log('First products array:', this.oneproduct);
    });

    titleService.setTitle(this.title);
    this.startSlide();
  }

  startSlide() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 4000);
  }
  stopSlide() {
    clearInterval(this.intervalId);
  }
  next() {
    this.itemActive = (this.itemActive + 1) % this.oneproduct.length;
  }
  prev() {
    this.itemActive = (this.itemActive - 1 + this.oneproduct.length) % this.oneproduct.length;
  }
  changeImage(index: number) {
    this.itemActive = index;
  }

}
