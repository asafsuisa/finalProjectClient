import { Observable }  from 'rxjs/Observable';
import { Injectable }     from '@angular/core';
import {Http, Response,Headers,RequestOptions } from '@angular/http';
import {Configuration} from '../configuration';
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class chatBotService {
  conf = new Configuration();
  serverURL;

  constructor(private http: Http)
  {
    this.serverURL = this.conf.serverURL;
  }

  runCode(code:string,id:string,args:any[],currLang:string,courseApp:string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8',
     'Accept': '*/*'});
         let options = new RequestOptions({ headers: headers });
    return this.http.post(this.serverURL+ 'courses/' + currLang+'/'+ courseApp + 
    '/' +id +'/run'
      ,{"code":code,"args":args},options).map((res: Response) => res.json());
  }

}
