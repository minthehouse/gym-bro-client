export class SetUser {
  static readonly type = '[User] set user';
  constructor(public payload: any) {}
}
