import {stageComponent} from '../app.stage.component';
import {StagePageService} from '../stage.component.service'
import {Configuration} from '../configuration';
import {Response, RequestOptions, Headers} from "@angular/http";
import {MdDialog, Overlay} from "@angular/material";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

describe('Stage Component', () => {
  let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8',
    'Accept': '*/*'});
  let options = new RequestOptions({ headers: headers });
  let stage_id: string = '1';
  let conf: Configuration = new Configuration();
  let stage_service: StagePageService = new StagePageService(conf.serverURL);
  let router: ActivatedRoute = new ActivatedRoute();
  router.params = new Observable();
  let stage:  stageComponent = new stageComponent(stage_service, null, router);

   it('Chatbot is hidden by default', function() {
     expect(stage.chatbotIsOn).toBe(false);
   });

  it('Hints are hidden by default', function() {
    expect(stage._isCollapsedContent).toBe(true);
  });


  it('Show Hints', function() {
    stage.collapseHints();
    expect(stage._isCollapsedContent).toBe(false);
  });

   it('Ace editor permission after successful compilation', function() {
     stage.title = 'app works!';
  //   stage.changeEditorEdit();
  //   expect(stage.editor.readonly).toBe(true);
   });
  //
   it('Ace editor permission after failed compilation', function() {
     stage.title = 'failed compilation';
  //   stage.changeEditorEdit();
  //   expect(stage.editor.readonly).toBe(false);
   });

  it('Page Theme is dark by default', function() {
    expect(stage.isDarkTheme).toBe(true);
  });

  it('Page Theme is dark by default', function() {
   // expect(stage.ngOnInit()).toBe(true);
  });

   it('Change Theme', function() {
  //   stage.changeToDarkTheme();
  //   expect(stage.isDarkTheme).toBe(false);
   });
});

