import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { SetToken } from './token.actions';
import { environment } from 'src/environments/environment';
import { ServerType } from 'src/app/enums/server-type.enum';

export class TokenStateModel {
  client?: string;
  token: string | TokenObject;
  expiry?: number;
  token_hash?: string;
}

export interface TokenObject {
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
    if (environment.serverType === ServerType.EXPRESS) {
      setState({ token: payload });
    } else {
      setState({ ...payload });
    }
  }
}
