import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';

import { FridgeDataService } from '../fridge-data.service';
import { Fridge } from '../fridge-data.service';


@Component({
    selector: 'update-item',
    templateUrl: './update-item.component.html',
    styleUrls: ['./update-item.component.css'],
    providers: [FridgeDataService]
})
export class UpdateItemComponent implements OnInit {

    constructor(private fridgeDataService: FridgeDataService) {
        this.form = new FormGroup({
            item: new FormControl(null)
        })
    }
    items: Fridge[];
    message: string;
    form: FormGroup;
    
    get item(): string {
        return this.form ? this.form.get('item').value : '';
    }
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
    onSubmit(updateFood: NgForm) {
        console.log("Item object ", JSON.stringify(updateFood.value));
        console.log("Is form valid?", updateFood.valid);
    }

    ngOnInit() {
        this.getItems();
    }


}
