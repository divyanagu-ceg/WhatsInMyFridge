import { Component, OnInit } from '@angular/core';
import { FridgeDataService } from '../fridge-data.service';
import { Fridge } from '../fridge-data.service';


@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
    providers: [FridgeDataService]
})
export class ListComponent implements OnInit {

    constructor(private fridgeDataService: FridgeDataService) {}
    items: Fridge[];
    message: string;

    private showError(error: any): void {
        this.message = error.message;
    };

    private getItems(): void {
        this.message = 'Getting items from your fridge...';
        this.fridgeDataService.getItems()
            .then(data => {
                    console.log(JSON.stringify(data))
                    this.message = data.length > 0 ? '' : 'No items in fridge! Time to restock!';
                    this.items = data;
                },
                err => {
                    console.error(JSON.stringify(err));
                    this.message = "Error while connecting to database! Please check database connectivity!";
                });
    }

    public deleteItem(itemId) {
        console.log("Item id to delete ", itemId);
        this.fridgeDataService.deleteItem(itemId)
            .subscribe(data => {
                    if (data == 200 || data == 204) {
                        this.ngOnInit();
                    } else {
                        this.message = "Error while deleting item!";
                    }
                },
                err => {
                    console.error(JSON.stringify(err));
                    this.message = "Error while connecting to database! Please check database connectivity!";
                });
    }

    ngOnInit() {
        this.getItems();
    }
}