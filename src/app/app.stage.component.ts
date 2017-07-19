import {Input,OnDestroy ,NgModule, Component,ViewChild,OnInit, ViewEncapsulation,AfterContentInit, ElementRef,QueryList } from '@angular/core';
import {stage} from './stage'
import {Router,ActivatedRoute} from '@angular/router';
import  {StagePageService} from './stage.component.service';
import {MdDialog, MdDialogRef,MdDialogConfig} from '@angular/material';
import {DialogCompilationComponent} from  './Dialog/dialog.component';
import {dialogStatus} from './Dialog/dialogStatus';
import { Subscription } from 'rxjs/Subscription';
import {CourseStageSevice} from  './app.course-stage-service';
import { CookieService } from 'ngx-cookie';
import {SimpleTimer} from 'ng2-simple-timer';

@Component({
  selector: 'stage-selector', 
  templateUrl: './app.stage.component.html',
  providers: [ StagePageService ],
  styleUrls: ['./app.component.css'],
 encapsulation: ViewEncapsulation.None

})
export class stageComponent implements OnInit,AfterContentInit,OnDestroy{
//Statistics
secondCounter:number=0;
timer0Id: string;

  currLang;
  courseApp;
  subscription: Subscription;
  title='s';
  chatbotIsOn:boolean = false;
  //router: Router;   
  currStage: stage = new stage();
  writtenCode='';
  @ViewChild('editor') editor;
  @ViewChild('introObj', {read: ElementRef}) introObj;
  isDarkTheme: boolean = true;
  @ViewChild('chatbotcomp') chatbotcomponent;
  links = ['sdasd','asdaasadasdsadsdassdsad','sadasdsda'];
  _isCollapsedContent = true;
  complilationCurrStatus:string;
  allCompilationStatus = new dialogStatus();
  chatbotinitmessage:string;
  activeRoute: ActivatedRoute;
  private sub:any;
  currRouter:Router;
  stageIdfromRouting:string;
  successLevel:boolean =false; //if the level complete succesfully
  isLastLevel:boolean=false; //if is the last level
  lastLevelId:number;
  cookieName:string;

  constructor(private stagePageService: StagePageService,public dialog: MdDialog,route:ActivatedRoute,router:Router,
  private courseStageSevice :CourseStageSevice,private _cookieService:CookieService,private st: SimpleTimer)
  {
    this.activeRoute = route;
    this.currRouter = router;
    this.subscription = courseStageSevice.missionAnnounced$.subscribe(
      mission => {

    });
 
  }

    openDialog(statuscode:number,caption:string,generic_message:string,error?:string,moreInfo?:string) {
    let config = new MdDialogConfig();
    config.disableClose=true;
    let dialogRef = this.dialog.open(DialogCompilationComponent,config);
    dialogRef.componentInstance.title = caption;
    dialogRef.componentInstance.content = generic_message; 
    error = error || null;
    dialogRef.componentInstance.error=error;
    moreInfo = moreInfo || null;
    dialogRef.componentInstance.moreInfo=moreInfo;
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

  ngOnInit()
  {
    this.st.newTimer('1sec',1);
    	this.subscribeTimer0();
    this.sub = this.activeRoute.params.subscribe (params =>
     {
        this.stageIdfromRouting = params['id'];
        
     }  );
    this.sub = this.activeRoute.parent.params.subscribe (params =>
     {
       this.currLang = params['currLang'];
        this.courseApp =params['courseApp']; 
     }
    );
    this.cookieName= 'codemonkey/'+this.currLang+ '/' + this.courseApp;
    let cookie =this._cookieService.get(this.cookieName);
    if(this.stageIdfromRouting == '0') //came from home page
    {
        if (cookie)
        {
            this.moveNextLevel((parseInt(cookie)-1).toString());
        }
        else
        {
          let d:Date = new Date();
          d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
          this._cookieService.put(this.cookieName, '1',
          {domain:'finalprojectcm.herokuapp.com',expires: d });
          this.moveNextLevel('0');
        } 
        this.stageIdfromRouting = '1';
    }
    else
    {
      
      let stageIdfromRoutingCasting = parseInt(this.stageIdfromRouting)-1;
       this.moveNextLevel(stageIdfromRoutingCasting.toString());
    }
    this.secondCounter =0;
  

  } 

  ngAfterContentInit() {
 
  }


  changeStatus(newStatus)
  {
    this.writtenCode = newStatus;
  }

  submit()
  {
    this.stagePageService.submitYourCode(this.currStage.id,this.writtenCode,this.currLang,this.courseApp).subscribe(
      response =>
      {
          //// add enable edit
        if (response["status"]=='compilation error')
        {
          this.complilationCurrStatus = 'compilation error';
          this.openDialog(2,response["caption"],response["generic_message"],response["error"],response["more_info"]);
          this.chatbotIsOn =false;
          
        }
         else 
         if (response["status"]=='success')
         {
          this.complilationCurrStatus = 'success';
           this.openDialog(0,response["caption"],response["generic_message"],null,response["more_info"]);
          this.chatbotIsOn =true;
          this.successLevel = true;
           this.editor.readonly=true;
           let cookie =this._cookieService.get(this.cookieName);
           if(cookie)
           {
            this._cookieService.remove(this.cookieName);
           }
         
            let d:Date = new Date();
             d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
            if(this.isLastLevel)
            {
        
                this._cookieService.put(this.cookieName, (parseInt(this.currStage.id)).toString(),
                {domain:'finalprojectcm.herokuapp.com', expires: d });
            }
           else
           {
   
             this._cookieService.put(this.cookieName, (parseInt(this.currStage.id)+1).toString(),
                {domain:'finalprojectcm.herokuapp.com', expires: d });
           }

        }
        else{ //unit tests failed
              this.openDialog(1,response["caption"],response["generic_message"],response["error"],response["more_info"]);
               this.chatbotIsOn =true; 
        }

      }
    );
  }

  moveNextLevel(id:string)
  {

    let id2 = parseInt(id) +1;
     //this.currStage.code='Loading...';
    this.stagePageService.getInitalDataForStage(( parseInt(id) +1).toString(),
    this.currLang, this.courseApp).subscribe(
      response =>
      {

          this.currStage.id = response["id"];
          this.currStage.topic= response["topic"];
          this.currStage.instructions = '<p>'+response["instructions"] +'</p>';
          this.currStage.generalTask= '<p>'+response["generaltask"] +'</p>';
          this.currStage.tasks =response["tasks"] ;
          this.currStage.hints= response["hints"];
          this.currStage.argstype=response["argstype"];
          this.currStage.numofargs=parseInt(response["numofargs"]);
          this.chatbotinitmessage=response["chatbotinitmessage"];
          this.currStage.argsmesssages=response["argsmesssages"];
          this.chatbotIsOn=false; 
          this.successLevel=false;
          this.currStage.code= response["code"] ;
          this.courseStageSevice.confirmMission(parseInt(this.currStage.id)-1);
          this.editor.readonly=false;
   

      this.isLastLevel = this.lastLevelId == parseInt(this.currStage.id);
 
       this.currRouter.navigateByUrl("course/"+this.currLang+"/"+this.courseApp+"/stage/"+this.currStage.id );
      }); 
         setTimeout(()=> {
            this._isCollapsedContent = true;
             this.secondCounter =0;
         });
        

  

  }



  changeEditorEdit()
  {

    if (this.title == 'app works!')
    {

      this.editor.changeReadOnlyModeToTrue();
    }
    else
    {

      this.editor.changeReadOnlyModeToFalse();
    }
  }
  collapseHints()
  {
    this._isCollapsedContent = !this._isCollapsedContent;
    setTimeout(()=>
    {
      this.scrollToBottom();
    });
  }

  scrollToBottom()
  {
    let out = this.introObj.nativeElement;
    out.scrollTop = out.scrollHeight;
  }


  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  	timer0callback() {
		this.secondCounter++;
	}

  subscribeTimer0() {
		if (this.timer0Id) {
			// Unsubscribe if timer Id is defined
			this.st.unsubscribe(this.timer0Id);
			this.timer0Id = undefined;
		} else {
			// Subscribe if timer Id is undefined
			this.timer0Id = this.st.subscribe('1sec', e => this.timer0callback());
		}
	}

  resetCode()
  {
    let t= this.currStage.code;
    this.editor.text=t.toString();
  }


}
