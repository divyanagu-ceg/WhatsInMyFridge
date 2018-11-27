import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { AddItemComponent } from './add-item/add-item.component';
import { UpdateItemComponent } from './update-item/update-item.component';

@NgModule({
    declarations: [
        AppComponent,
        ListComponent,
        AddItemComponent,
        UpdateItemComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([{
                path: '',
                component: ListComponent
            },
            {
                path: 'list',
                component: ListComponent
            },
            {
                path: 'add-item',
                component: AddItemComponent
            },
            {
                path: 'update-item',
                component: UpdateItemComponent
            }
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
