
import {ChatBotComponent} from "../ChatBot/chatbot.component";
import {chatBotService} from "../ChatBot/chatbot.component.service";
import {Configuration} from "../configuration";
describe('Ace Editor Component', () => {

  let comp:    ChatBotComponent = new ChatBotComponent(new chatBotService(new Configuration().serverURL));

  it('Send Message', function() {
  });

});
