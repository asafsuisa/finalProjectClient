import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Md2Module } from 'md2';
import { HttpModule, JsonpModule } from '@angular/http';
import { AceEditorModule} from 'ng2-ace-editor';
import { AppComponent } from './app.component';
import {stageComponent} from './app.stage.component';
import {courseComponent} from './app.course.component';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { MyComponent } from './aceTry';
import { MaterialModule } from '@angular/material';
//import {Angular2FlexModule} from 'angular2-flex';
import { RouterModule,Router,ActivatedRoute,Params } from '@angular/router';
import {HashLocationStrategy,LocationStrategy} from '@angular/common';
import {ChatBotComponent} from './ChatBot/chatbot.component';
import {ChatMessageComponent} from './ChatBot/message.component';
import {DialogCompilationComponent} from './Dialog/dialog.component';
import {appRootRoutingList} from './routing.moudle';
import {HomePageComponent} from './homePage/app.home.page';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouteReuseStrategy } from '@angular/router';
import { CookieModule } from 'ngx-cookie';
import { SimpleTimer } from 'ng2-simple-timer';
import {SafeHtmlPipe} from './Dialog/safeHtmlPipe';

import 'hammerjs';
@NgModule({
  declarations: [
    AppComponent, 
    MyComponent,
    ChatBotComponent,
    ChatMessageComponent,
    DialogCompilationComponent,
    stageComponent, 
    courseComponent,
   HomePageComponent,
   SafeHtmlPipe
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AceEditorModule ,
    HttpModule,
    JsonpModule, 
    FlexLayoutModule,
    MaterialModule.forRoot(),
    CookieModule.forRoot(),
    //Angular2FlexModule.forRoot(),
    Md2Module.forRoot(),
    RouterModule.forRoot(appRootRoutingList),
   //RouterModule.forChild(appCourseRoutingList)
  ],
  providers: [{provide: LocationStrategy, useClass:HashLocationStrategy},SimpleTimer],
  entryComponents: [DialogCompilationComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
