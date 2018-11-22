import { Component, OnInit } from '@angular/core';
import { FridgeDataService } from '../fridge-data.service';
import { Fridge } from '../fridge-data.service';


@Component({
  selector: 'add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
  providers: [FridgeDataService]
})
export class AddItemComponent implements OnInit {
    
  constructor(private fridgeDataService: FridgeDataService) { }
  
  
  
  items: Fridge[];
  message: string;
  
  private showError(error: any): void {
    this.message = error.message;
  };
  
  private getItems(): void {
    this.message = 'Getting items from your fridge...';
    this.fridgeDataService.getItems()
    .then(data => {
        this.message = data.length > 0 ? '' : 'No items in fridge! Time to restock!';
        this.items = data;
    });
  }

  ngOnInit() {
    this.getItems();
  }

  
}
