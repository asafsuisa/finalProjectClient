import {NgModule,Input ,Component, ViewChild, ElementRef, OnInit,AfterContentInit} from '@angular/core';
import {OneMessageInstance} from './message.component';
import {Router} from '@angular/router';
import { Observable }  from 'rxjs/Observable';
import {ChatMessageComponent} from './message.component';
import {chatBotService} from './chatbot.component.service';


@Component({
  selector: 'chatBot',
  templateUrl: './chatbot.component.html',
  providers: [ chatBotService ],
  styleUrls: ['../app.component.css']

})
export class ChatBotComponent implements OnInit,AfterContentInit {

  @Input()
  code:string;

  @Input()
  chatbotinitmessage:string;

  @Input()
  numofargs:number;


  @Input()
  argstype;

  @Input()
  stageID;

  @Input()
  currLang;

  @Input()
  courseApp;

  @Input()
  argsmesssages;

  messageList: OneMessageInstance[] = [];
  draftMessage: OneMessageInstance;
  buttonDisabled:boolean=false;
  CurrArgsValue:any[]=new Array<any>();
  @ViewChild("angularcb1") messageInputObj: ElementRef;
  @ViewChild("chatbotBody") chatbotBody: ElementRef;
  id;
  enableEdit=false;
  argsCounter =0;
  ngOnInit() {
    this.draftMessage = new OneMessageInstance('',true,'ss');
  }


  ngAfterContentInit() {
      this.enableEdit=false;
      this.messageList.push(new OneMessageInstance(this.chatbotinitmessage,false, "/assets/images/monkey.png"));
       if (this.numofargs !=1)
       {
          this.messageList.push(new OneMessageInstance(this.argsmesssages[0],false, "/assets/images/monkey.png"));
       }
      /*
      if (this.numofargs ==1)
      {
        this.messageList.push(new OneMessageInstance('Please enter '+this.numofargs+ ' argument',false,
      "/assets/images/monkey.png"));
      }
      else
      {
      this.messageList.push(new OneMessageInstance('Please enter '+this.numofargs+ ' arguments',false,
      "/assets/images/monkey.png"));
    }
    */
  }

  constructor(private chatBotServiceObj: chatBotService,public el: ElementRef) {
  }
 
  sendMessage(event: any) {
    this.buttonDisabled=true;
    this.messageList.push(new OneMessageInstance(this.draftMessage.contant,true, "/assets/images/male-avatar-1.png"));                            
  //  var type = this.castTypeOf(this.argstype[this.argsCounter],this.draftMessage.contant);
   this.CurrArgsValue[this.argsCounter]=this.draftMessage.contant;
   this.argsCounter++; 
    if (this.argsCounter == this.numofargs)
    {
      this.chatBotServiceObj.runCode(this.code,this.stageID,this.CurrArgsValue,this.currLang,this.courseApp)
      .subscribe(
      response =>
      {
        if (response["result"]){
      this.messageList.push(new OneMessageInstance(response["result"],false,"/assets/images/monkey.png"));
        }
      this.CurrArgsValue=new Array<any>();
      this.argsCounter=0;
      if (this.numofargs !=1)
            {
              this.messageList.push(new OneMessageInstance(this.chatbotinitmessage,false, "/assets/images/monkey.png"));
              this.messageList.push(new OneMessageInstance(this.argsmesssages[0],false, "/assets/images/monkey.png"));
            }
            else{
               this.messageList.push(new OneMessageInstance(this.chatbotinitmessage,false, "/assets/images/monkey.png"));
            }
          setTimeout(()=>
          {
          this.scrollToBottom();
          this.buttonDisabled=false;
          },5);
      });
    }
    else
    {
      if(this.argsmesssages[this.argsCounter]){
      this.messageList.push(new OneMessageInstance(this.argsmesssages[this.argsCounter],false, "/assets/images/monkey.png"));
      }
    }
    //
    //this.messageInputObj["value"] = '';
    setTimeout(()=>
    {
      this.scrollToBottom();
    },5);
  this.draftMessage = new OneMessageInstance('',true,'ss');
   event.preventDefault();
  }


  scrollToBottom(): void {
    let scrollPane: any = this.el
      .nativeElement.querySelector('.msg-container-base');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }

}
