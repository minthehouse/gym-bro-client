import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { SetToken } from './token.actions';

export class TokenStateModel {
  client: string;
  token: string;
  expiry: number;
  token_hash: string;
}

@State<TokenStateModel>({
  name: 'token',
})
@Injectable()
export class TokenState {
  @Action(SetToken)
  setToken({ setState }: StateContext<TokenStateModel>, { payload }: SetToken) {
    setState({ ...payload });
  }
}
