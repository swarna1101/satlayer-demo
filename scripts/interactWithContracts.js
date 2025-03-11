const { Tendermint34Client } = require('@cosmjs/tendermint-rpc');
const { Registry } = require('@cosmjs/proto-signing');

const RPC_URL = 'https://rpc.sat-bbn-testnet1.satlayer.net';
const BVSDIRECTORY_ADDRESS = 'bbn1f803xuwl6l7e8jm9ld0kynvvjfhfs5trax8hmrn4wtnztglpzw0sm72xua';

async function interact() {
    const client = await Tendermint34Client.connect(RPC_URL);

    // Example query to get registered services from BVSDirectory
    // Note: This is a placeholder and may need adjustments based on the actual contract ABI and functionality
    const response = await client.queryContractSmart(BVSDIRECTORY_ADDRESS, {
        get_registered_services: {},
    });

    console.log(response);
}

interact().catch((error) => {
    console.error(error);
});
