// scripts/deployBVS.js
const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing');
const { Tendermint34Client } = require('@cosmjs/tendermint-rpc');
const { Registry } = require('@cosmjs/proto-signing');
const { Coin } = require('cosmjs-types/cosmos/base/v1beta1/coin');

const RPC_URL = 'https://rpc.sat-bbn-testnet1.satlayer.net';
const WALLET_MNEMONIC = 'your-test-mnemonic-here'; // Replace with your mnemonic
const CONTRACT_ADDRESS = 'your-contract-address-here'; // Replace with your contract address if needed

async function deploy() {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(WALLET_MNEMONIC, {
        prefix: 'bbn',
    });

    const client = await Tendermint34Client.connect(RPC_URL);

    const account = await wallet.getAccounts();
    const senderAddress = account[0].address;

    // Example transaction to register a service with BVSDirectory
    // Note: This is a placeholder and may need adjustments based on the actual contract ABI and functionality
    const msg = {
        typeUrl: '/satlayer.bvs.v1.MsgRegisterService',
        value: {
            serviceAddress: CONTRACT_ADDRESS,
            // Add other required fields here
        },
    };

    const fee = {
        amount: [Coin.fromDecimal('1000', 'ubbn')],
        gas: '200000',
    };

    const result = await client.signAndBroadcast(senderAddress, [msg], fee, '');
    console.log(result);
}

deploy().catch((error) => {
    console.error(error);
});
