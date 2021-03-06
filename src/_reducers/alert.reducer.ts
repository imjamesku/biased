import { EAlertActionTypes } from '../_actionTypes/alert'

const initialState: IAlertState =  { type: "", message: ""}

export interface IAlertBaseAction {
    type: EAlertActionTypes;
    message: string;
}

export interface IAlertState {
    type: string;
    message: string;

}

export function alert(state = initialState, action: IAlertBaseAction): IAlertState {
    switch (action.type) {
      case EAlertActionTypes.SUCCESS:
        return {
          type: 'alert-success',
          message: action.message
        };
      case EAlertActionTypes.ERROR:
        return {
          type: 'alert-danger',
          message: action.message
        };
      case EAlertActionTypes.CLEAR:
        return {
            type: '',
            message: ''
        };
      default:
        return state
    }
  }