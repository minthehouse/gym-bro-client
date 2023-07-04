import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { SetUser } from './user.actions';

export class UserStateModel {
  public user_id: number;
  public first_name: string;
  public last_name: string;
  public email: string;
  public uid: string;
  public userToken: IUserToken;
}

interface IUserToken {
  client: string;
  token: string;
  expiry: number;
  token_hash: string;
}

@State<UserStateModel>({
  name: 'user',
})
@Injectable()
export class UserState {
  @Action(SetUser)
  setUser({ setState }: StateContext<UserStateModel>, { payload }: SetUser) {
    setState({ ...payload?.user, userToken: payload.token });
  }
}
