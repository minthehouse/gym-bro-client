import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { SetLatestWorkout } from './history.actions';

export class HistoryStateModel {
  public latest: any;
}

const defaults = {
  latest: null,
};

@State<HistoryStateModel>({
  name: 'history',
  defaults,
})
@Injectable()
export class HistoryState {
  @Action(SetLatestWorkout)
  SetLatestWorkout(
    { setState }: StateContext<HistoryStateModel>,
    { payload }: SetLatestWorkout
  ) {
    setState({
      ...payload,
    });
  }
}
