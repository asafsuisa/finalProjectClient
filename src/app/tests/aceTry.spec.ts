import {MyComponent} from '../aceTry';

describe('Ace Editor Component', () => {

  let comp:    MyComponent = new MyComponent();

    it('Change Read Only Mode by default', function() {
        expect(comp.readonly).toBe(false);
    });

    it('Change Read Only Mode to true', function() {
      comp.changeReadOnlyModeToTrue();
      expect(comp.readonly).toBe(true);
    });

    it('Change Read Only Mode to false', function() {
      comp.changeReadOnlyModeToFalse();
      expect(comp.readonly).toBe(false);
    });

    it('Change Topic', function() {
      comp.changeText('Test Code Monkey');
      expect(comp.text).toBe('Test Code Monkey');
    });

    it('On Change', function() {
      comp.onChange('Test Code Monkey');
    });

});
