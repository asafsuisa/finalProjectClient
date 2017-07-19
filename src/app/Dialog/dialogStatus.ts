//import {NgModule} from '@angular/core';

export class dialogStatus
{
    allStatus:status[]= new Array<status>();
    constructor()
    {
        this.allStatus.push(new status('Good work!','Your code is correct.'+ '\n'+ 'Please check it using the ChatBot.'));
        this.allStatus.push(new status('Run Time Error','Please verify you followed the instructions using the chatbot'
            + '\n'+ 'The reasons are:'+ '\n'));
        this.allStatus.push(new status('Compilation error','A syntax error has occurred: '));
    }


}

export class status
{
    title:string;
    content:string;
    constructor(title:string,content:string)
    {
        this.title= title;
        this.content = content;
    }
}