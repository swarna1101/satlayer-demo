import { Coin } from 'cosmjs-types/cosmos/base/v1beta1/coin';

export interface StateBankInterface {
    getState(): Promise<any>;
    updateState(newState: any): Promise<any>;

}

export interface MsgUpdateState {
    typeUrl: '/satlayer.state.v1.MsgUpdateState';
    value: {
        newState: any;

    };
}
