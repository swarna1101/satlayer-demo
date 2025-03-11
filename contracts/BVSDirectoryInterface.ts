import { Coin } from 'cosmjs-types/cosmos/base/v1beta1/coin';

export interface BVSDirectoryInterface {
    getRegisteredServices(): Promise<any>;
    registerService(serviceAddress: string): Promise<any>;
    deregisterService(serviceAddress: string): Promise<any>;
}

export interface MsgRegisterService {
    typeUrl: '/satlayer.bvs.v1.MsgRegisterService';
    value: {
        serviceAddress: string;

    };
}

export interface MsgDeregisterService {
    typeUrl: '/satlayer.bvs.v1.MsgDeregisterService';
    value: {
        serviceAddress: string;

    };
}
