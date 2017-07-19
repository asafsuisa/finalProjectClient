import { AppComponent} from '../app.component';
import {StagePageService} from '../app.component.service';
import {Configuration} from '../configuration';
import {stage} from "../stage";

describe('Main Component', () => {
  let comp = new AppComponent( new StagePageService(new Configuration().serverURL));

  it('Default Stage', function() {
    expect(comp.currStage.id).toBe(1);
  });

  it('Next Stage', function() {
    var prevState = comp.currStage.id;
   // comp.NextStage(); // TODO
    expect(comp.currStage.id).toBe(prevState + 1);
  });

  it('Submit Code Success', function() {
    var code = 'print \'Hello World\'';
    // comp.submit(code); // TODO
    expect(comp.writtenCode).toBe(code);
  });

  it('Submit Code Fail', function() {
    var code = 'printg \'Hello World\'';
   // var success =  comp.submit(code); // TODO
   // expect(success).toBe(false);
  });

  it('Edit Code', function() {
    var code = 'print \'Hello World\'';
    comp.changeStatus(code); // TODO
    expect(comp.writtenCode).toBe(code);
  });

});


