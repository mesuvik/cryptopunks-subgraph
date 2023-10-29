"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processor = void 0;
const archive_registry_1 = require("@subsquid/archive-registry");
const evm_processor_1 = require("@subsquid/evm-processor");
exports.processor = new evm_processor_1.EvmBatchProcessor()
    .setDataSource({
    // Change the Archive endpoints for run the squid
    // against the other EVM networks
    // For a full list of supported networks and config options
    // see https://docs.subsquid.io/evm-indexing/
    archive: (0, archive_registry_1.lookupArchive)('eth-mainnet'),
    // Must be set for RPC ingestion (https://docs.subsquid.io/evm-indexing/evm-processor/)
    // OR to enable contract state queries (https://docs.subsquid.io/evm-indexing/query-state/)
    chain: {
        url: 'https://rpc.ankr.com/eth',
        rateLimit: 10
    }
})
    .setFinalityConfirmation(75)
    .setFields({
    transaction: {
        from: true,
        value: true,
        hash: true,
    },
})
    .setBlockRange({
    from: 6000000,
})
    .addTransaction({
    to: ['0x0000000000000000000000000000000000000000'],
});
//# sourceMappingURL=processor.js.map