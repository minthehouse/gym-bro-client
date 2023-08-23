import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { SetUser } from './user.actions';

export class UserStateModel {
  age: number;
  email: string;
  first_name: string;
  gender: string;
  goal: string;
  height_in_feet: number;
  height_in_inches: number;
  id: number;
  last_name: string;
  uid: string;
  weight: number;
}

@State<UserStateModel>({
  name: 'user',
})
@Injectable()
export class UserState {
  @Action(SetUser)
  setUser({ setState }: StateContext<UserStateModel>, { payload }: SetUser) {
    setState({ ...payload });
  }
}
