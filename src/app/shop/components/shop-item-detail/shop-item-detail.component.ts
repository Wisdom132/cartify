import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, ShopService } from 'core';
import { Observable } from 'rxjs';
import { IShopItem } from 'shared';

@Component({
    templateUrl: './shop-item-detail.component.html',
    styleUrls: ['./shop-item-detail.component.css'],
    providers: [ShopService]
})
export class ShopItemDetailComponent implements OnInit {
    public shopItem$: Observable<IShopItem>;
    private reviewText = '';
    private starRating = 0;

    constructor(
        private auth: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private shop: ShopService) {}

    ngOnInit(): void {
        this.shopItem$ = this.shop.getShopItem(
            this.route.snapshot.paramMap.get('id')
        );
    }

    goBack(): void {
        this.router.navigate(['/items']);
    }

    onSubmit(shopItemId: string, remarks: string): void {
        this.shop.setShopItemReview(shopItemId, remarks, this.starRating)
            .subscribe(shopItemReview => {
                this.reviewText = '';
                this.starRating = 0;
                this.ngOnInit();
                console.log('Review added');
            }
        );
    }
}
