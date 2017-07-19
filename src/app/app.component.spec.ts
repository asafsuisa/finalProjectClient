import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent} from './app.component';
import { AceEditorDirective } from 'ng2-ace-editor';
import { MyComponent } from './aceTry';
import { DebugElement }  from '@angular/core';

describe('App: PROJECTNAME', () => {
  let comp = new AppComponent();
  let fixture: ComponentFixture<AppComponent>;

  let spy: jasmine.Spy;
  let de: DebugElement;
  let el: HTMLElement;



  beforeEach(() => {
    TestBed.configureTestingModule({

      declarations: [
        AppComponent,
        AceEditorDirective,
        MyComponent
      ],
    });

    fixture = TestBed.createComponent(AppComponent);
    comp    = fixture.componentInstance;
  });


  it('should create the app', async(() => {
    fixture.detectChanges();
    // update view with quote
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));


  it(`should have as title 'app works!'`, async(() => {

    // wait for async getQuote
    fixture.detectChanges();        // update view with quote
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toBe('app works!');

  }));

  it('should render title in a h1 tag', async(() => {


    fixture.detectChanges();        //  view with quote

    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');

  }));
});
