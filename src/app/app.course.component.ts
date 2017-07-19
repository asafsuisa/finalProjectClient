import {NgModule, Component,ViewChild,OnInit, ViewEncapsulation,AfterContentInit, ElementRef,QueryList } from '@angular/core';
import {stage} from './stage'
import {MdDialog, MdDialogRef,MdDialogConfig} from '@angular/material';
import {Router,ActivatedRoute} from '@angular/router';
import {DialogCompilationComponent} from  './Dialog/dialog.component';

import {dialogStatus} from './Dialog/dialogStatus';
//import 'ace-builds/src-min/ace';
import {Configuration} from './configuration';
 import {CourseStageSevice} from  './app.course-stage-service';
 import { Subscription } from 'rxjs/Subscription';
 import {CoursePageService} from './course.component.service';

export class Course
{
  title:string;
  general:string;
  syllabus:any;
  exercises:any[];

  courseApp:string;
  currLang:string;
  logo:any;


  constructor(currTitle:string,currGeneral:string,currsyllabus:any,courseApp:string,currLang:string )
  {
      this.title =currTitle;
      this.general = currGeneral;
      this.syllabus = currsyllabus;
      this.exercises = new Array<any>();
      this.currLang=currLang;
      this.courseApp=courseApp;
  }

} 



@Component({
  selector: 'app-course-selector',
  templateUrl: './app.course.component.html',
  providers:[CourseStageSevice,CoursePageService ],
  styleUrls: ['./app.component.css'],
 encapsulation: ViewEncapsulation.None

})
export class courseComponent implements OnInit,AfterContentInit{
  links = [];
   isDarkTheme: boolean = true;
    @ViewChild('editor') editor;
    currCourse:Course= new Course('','','','','');
    sub:any;
    activeRoute: ActivatedRoute;
    conf:Configuration;
     @ViewChild('stage') stage;
      @ViewChild('sidenav') sidenav;
      selectedIndex:number = 0;
    subscription: Subscription;

 constructor(route:ActivatedRoute,private courseStageSevice:CourseStageSevice
              ,private coursePageService:CoursePageService)
  {
    this.activeRoute = route;
     courseStageSevice.missionConfirmed$.subscribe(
      indexid => {

        this.selectedIndex =indexid ;
      });
  }
    
 ngOnInit(){
     this.sub = this.activeRoute.params.subscribe (params =>
     {

        this.currCourse.currLang = params['currLang'];
        this.currCourse.courseApp =params['courseApp']; 
       // this.conf = new Configuration(this.currCourse.currLang,this.currCourse.courseApp);
   
        this.coursePageService.getAllExcrsisesData(this.currCourse.currLang,this.currCourse.courseApp).subscribe(
          response =>
          {

            this.links = response;
            this.stage.lastLevelId = this.links.length;

          }

        );

     });

 }

 ngAfterContentInit(){}

 onActivate(event){
    this.editor = event['editor'];
    this.stage = event;
    this.stage.lastLevelId = this.links.length;

    
 }
changeToDarkTheme()
  { 
    if (this.isDarkTheme)
    {
      this.editor.theme ='eclipse';
    }
    else
    {
      this.editor.theme = 'tomorrow_night';
    }
    this.isDarkTheme = !this.isDarkTheme;
  }


  moveStage(i:number)
  {

     this.stage.moveNextLevel(i.toString());
     this.selectedIndex = i;
        setTimeout(()=>
    {
       this.sidenav.close();
    },100);

  }

}
