import {NgModule, Component, ViewChild, ElementRef, OnInit,AfterContentInit, Input} from '@angular/core';



export class OneMessageInstance
{
    contant:string;
    incoming: boolean;
    srcImg:any;

    constructor(newCon:string,isIncoming:boolean,img:any)
    {
      this.contant = newCon;
      this.incoming = isIncoming;
      this.srcImg = img;
    };
}


@Component({
  inputs: ['message'],
  selector: 'chat-message',
  styleUrls: ['./message.component.css'],
  template: `
      
 <div class="msg-container" 
  [ngClass]="{'base-sent': !incoming, 'base-receive': incoming}">
      <div class="avatar"
         *ngIf="!message.incoming">
      <img src="{{message.srcImg}}">
    </div>


    <div class="messages" [ngClass]="{'msg-sent': !incoming, 'msg-receive': incoming}">
      <div *ngFor="let oneP of message.contant?.split('\\n')">
        <div [innerHTML]="oneP | safeHtml"></div>
      </div> 
    </div> 
    <div class="avatar" *ngIf="message.incoming">
      <img src="{{message.srcImg}}">
    </div>
  </div>
  `
})
export class ChatMessageComponent implements OnInit {


  /*
  @Input()
  message:OneMessageInstance;
*/
  constructor() {
  }

  ngOnInit(): void {
  }

}
