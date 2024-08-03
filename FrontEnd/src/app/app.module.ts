import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthadminService } from './views/services/authadmin.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleTranslateComponent } from './google-translate/google-translate.component';


@NgModule({
  declarations: [
    AppComponent,
    GoogleTranslateComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,


    
  ],
  providers: [AuthadminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
