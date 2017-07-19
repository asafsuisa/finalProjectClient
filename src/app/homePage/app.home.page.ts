import {NgModule,Component,Input,OnInit} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Course} from '../app.course.component';
import {Router,ActivatedRoute} from '@angular/router';
import {HomePageService} from './app.home.component.service';


@Component({
  selector: 'home-page',
  templateUrl: './app.home.page.html',
  styleUrls: ['./app.home.component.css'],
  providers:[HomePageService]
})
export class HomePageComponent implements OnInit {

  allCourses:Course[] = new Array<Course>();
  currRouter:Router;
  constructor(private router: Router,private homePageService:HomePageService) {
    this.currRouter = router;
  }

  ngOnInit(){
    this.homePageService.getAllCoursesData().subscribe(
      response=> 
      { 
        this.allCourses =response;
      }
    );

  }

  enterCourse(courseApp:string,currLang:string)
  {
      this.currRouter.navigateByUrl("course/"+courseApp+"/"+currLang);
  }
}
