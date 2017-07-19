import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
@Injectable()
export class CourseStageSevice {
  // Observable string sources
  private missionAnnouncedSource = new Subject<number>();
  private missionConfirmedSource = new Subject<number>();
  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();
  // Service message commands
  announceMission(mission: number) {

    this.missionAnnouncedSource.next(mission);
  }
  confirmMission(astronaut: number) {

    this.missionConfirmedSource.next(astronaut);
  }
}