import {chatBotService} from '../ChatBot/chatbot.component.service';
import {Configuration} from '../configuration';
import {ChatBotComponent} from '../ChatBot/chatbot.component'
import {ElementRef} from "@angular/core";
import any = jasmine.any;
import {isUndefined} from "util";
import {isNullOrUndefined} from "util";



describe('Chatbot Component', () => {

  let conf: Configuration = new Configuration();
  let ex_id: string = '1';
  let args: any[];
  let chatbot:  chatBotService = new chatBotService(conf.serverURL);
  let chatbot_com: ChatBotComponent =  new ChatBotComponent(chatbot, new ElementRef(null));
  let code: string = "def printName(name): \n print name \n return";
  let bad_code: string = "def printName(name): \n print fail \n return";

  it('Server Address', function() {
    expect(chatbot.serverURL).toBe('http://finalprojectcm.herokuapp.com/');
  });

  it('Current Course Programming Language', function() {
    expect(conf.currLang).toBe('python');
  });

  it('Server Address', function() {
    // expect(chatbot.runCode(code, ex_id, args)).message();
   });

  it('Argument Initialization', function() {
    expect(chatbot_com.argsCounter).toBe(0);
  });

  it('Chatbot is hidden by default', function() {
    expect(chatbot_com.enableEdit).toBe(false);
  });

  it('Chatbot Content Init', function() {
    //expect(chatbot_com.ngAfterContentInit()).toBe('undefined');
  });
});
