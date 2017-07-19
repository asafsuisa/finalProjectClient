import {NgModule, Component,ViewChild,OnInit, ViewEncapsulation,AfterContentInit, ElementRef,QueryList } from '@angular/core';
import {stage} from './stage'
import {Router} from '@angular/router';
import {MdDialog, MdDialogRef,MdDialogConfig} from '@angular/material';
import {DialogCompilationComponent} from  './Dialog/dialog.component';
import {dialogStatus} from './Dialog/dialogStatus';
//import 'ace-builds/src-min/ace';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 encapsulation: ViewEncapsulation.None

})
export class AppComponent implements OnInit,AfterContentInit{

  constructor()
  {
  }

  ngOnInit()
  {

  }

  ngAfterContentInit() {
  }


}
