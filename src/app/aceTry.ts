import { AceEditorComponent } from 'ng2-ace-editor';
import { Component , ViewChild , Output , Input ,EventEmitter } from '@angular/core';


@Component({
  selector: 'aceEditor',
  template: `
    <div ace-editor #editor class="text-inside-grid" color="primary"
       [text]="text"
       [mode]="mode"
       [theme]="theme"
       [options]="options"
       [readOnly]="readonly"
       [autoUpdateContent]="true"
       (textChanged)="onChange($event)"
       style="min-height:400px; width:700px;overflow: auto;"></div>
  `
})
export class MyComponent {
  theme = 'tomorrow_night';
  options:any = {maxLines: 20, printMargin: false,fontSize:"13pt", autoScrollEditorIntoView: true,enableBasicAutocompletion: true};
  readonly:any = false;

  @ViewChild('editor') editor;

  @Input()
  text:string;

  @Output()
  currStatus = new EventEmitter<string>();

  @Input()
  mode;

  changeReadOnlyModeToFalse()
  {
    this.readonly = false;
  }

  changeText(newText:string)
  {
    this.text = newText;
  }

  changeReadOnlyModeToTrue()
  {
    this.readonly = true;
  }

  onChange(code) {
    this.currStatus.emit(code);
    this.text=code; 
  }
}
