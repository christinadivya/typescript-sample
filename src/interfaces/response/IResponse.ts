export interface ISuccessMessage {
  message: string;
}
export interface ISuccessMsgWithAdditionalField extends ISuccessMessage {
  id: number;
  email?: string;
  account_id?: string;
}
