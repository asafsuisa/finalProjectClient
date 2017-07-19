import {AppComponent} from './app.component';
import {stageComponent} from './app.stage.component';
import {courseComponent} from './app.course.component';
import {HomePageComponent} from './homePage/app.home.page';

export const appRootRoutingList = [
   { path: '', component: AppComponent,
    children: [
      {path : '' , component: HomePageComponent, pathMatch: 'full' }, 
      {path : 'home' , component: HomePageComponent, pathMatch: 'full' },
      { path: 'course/:currLang/:courseApp', component: courseComponent,
      children: [
        { path: '', redirectTo: 'stage/0', pathMatch: 'full' },
        { path: 'stage/:id', component:stageComponent }
        ]
  }
   ]}
];


