import { Coin } from 'cosmjs-types/cosmos/base/v1beta1/coin';

export interface BVSDriverInterface {
    executeService(serviceAddress: string, data: any): Promise<any>;
    // Add other methods as needed
}

export interface MsgExecuteService {
    typeUrl: '/satlayer.bvs.v1.MsgExecuteService';
    value: {
        serviceAddress: string;
        data: any;
        // Add other required fields here
    };
}
