import { Observable }  from 'rxjs/Observable';
import { Injectable }     from '@angular/core';
import {Http, Response,Headers,RequestOptions  } from '@angular/http';
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import {Configuration} from './configuration';


@Injectable()
export class CoursePageService {
  serverURL;
  conf = new Configuration();

  constructor(private http: Http) {
    this.serverURL = this.conf.serverURL;
  }


 getAllExcrsisesData(currLang,courseApp): Observable<any> {
     let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8',
     'Accept': '*/*'});
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.serverURL+ 'courses/' + currLang+'/'+ courseApp+ 
    '/all_exercises',options)
      .map((res: Response) => res.json());
  }



}
