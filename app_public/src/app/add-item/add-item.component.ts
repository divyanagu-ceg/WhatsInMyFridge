import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router"

import { FridgeDataService } from '../fridge-data.service';
import { Fridge } from '../fridge-data.service';


@Component({
    selector: 'add-item',
    templateUrl: './add-item.component.html',
    styleUrls: ['./add-item.component.css'],
    providers: [FridgeDataService]
})
export class AddItemComponent implements OnInit {

    constructor(private fridgeDataService: FridgeDataService, private router: Router) {}

    message: string;

    private showError(error: any): void {
        this.message = error.message;
    };

    onSubmit(addfood: NgForm) {
        console.log("Item object ", JSON.stringify(addfood.value));
        console.log("Is form valid?", addfood.valid);

        if (!addfood.valid) {
            this.message = "Missing required fields Name/Date/Quantity! Cannot add item to fridge!!";
        } else {
            this.fridgeDataService.addItem(addfood.value)
                .subscribe(data => {
                    console.log(JSON.stringify(data));
                    if (data == 201) {
                        this.router.navigate(['/list']);
                    } else {
                        this.message = "Error occurred while adding data. Please try again!"
                    }
                },
                err => {
                    console.error(JSON.stringify(err));
                    this.message = "Error while connecting to database! Please check database connectivity!";
                });
        }

    }
    ngOnInit() {

    }
}