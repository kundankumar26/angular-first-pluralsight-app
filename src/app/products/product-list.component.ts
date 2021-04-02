import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";


@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],

})

export class ProductListComponent implements OnInit, OnDestroy {
    
    pageTitle: String = "Product List";
    imageWidth: number = 100;
    imageMargin: number = 2;
    showImage: boolean = false;
    private _listFilter: string = ' ';
    errorMessage = " ";
    sub!: Subscription;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.performFilter(value);
        console.log('In setter: ' + this._listFilter);
    }
    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];

    constructor(private productService: ProductService){};

    ngOnInit(): void {
        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                //this.filteredProducts = this.products;
                this.filteredProducts = this.performFilter(this._listFilter);
            },
            error: err => this.errorMessage = err
        });
        this._listFilter = 'cart';
        
        //this.filteredProducts = this.performFilter(this._listFilter);
        console.log("in init");
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
            product.productName.toLocaleLowerCase().includes(filterBy));
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
}