import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { StripeModule } from '../stripe/stripe.module';
import { HomeModule } from '../home/home.module';
import { UsersModule } from '../users/users.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        StripeModule,
        HomeModule,
        UsersModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }