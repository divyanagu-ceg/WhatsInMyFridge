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
  
  public onSubmit(user: Fridge): void {
    console.log(user);

  }

  ngOnInit() {
    
  }

  
}
