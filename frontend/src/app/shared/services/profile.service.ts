import { Injectable, OnDestroy } from '@angular/core';
import { ProfileInfoResponseDto } from '@dto/profile/profile-info-response.dto';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService implements OnDestroy {
  private _profileInfo$ = new Subject<ProfileInfoResponseDto | null>();

  getProfileInfo(): Observable<ProfileInfoResponseDto | null> {
    return this._profileInfo$;
  }

  setProfileInfo(info: ProfileInfoResponseDto | null): void {
    this._profileInfo$.next(info);
  }

  ngOnDestroy(): void {
    this._profileInfo$.unsubscribe();
  }
}
