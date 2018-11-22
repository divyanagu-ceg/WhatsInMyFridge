import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { AddItemComponent } from './add-item/add-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddItemComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      /*{
        path: '',
        component: HomepageComponent
      },*/
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'add-item',
        component: AddItemComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
