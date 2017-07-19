export class stage {

  id:string;

  topic:string;

  instructions:string;

  tasks:string[];

  hints:string[];

  code:string;

  numofargs:number;

  argstype:string[];

  argsmesssages:string[];

  generalTask:string;

  constructor(){
    this.id ='1';
    this.instructions = ' ';
    this.tasks = [];
    this.hints=[];

    this.code= ' '
    this.argstype=[];
    this.numofargs=0;
    this.argsmesssages=[];
  }


}
