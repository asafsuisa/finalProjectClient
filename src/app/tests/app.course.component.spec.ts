import {courseComponent} from '../app.course.component';

describe('Course Component', () => {

  let course:  courseComponent = new courseComponent();

  it('Page Theme is dark by default', function() {
    expect(course.isDarkTheme).toBe(true);
  });
});

