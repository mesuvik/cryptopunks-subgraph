"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_store_1 = require("@subsquid/typeorm-store");
const model_1 = require("./model");
const processor_1 = require("./processor");
processor_1.processor.run(new typeorm_store_1.TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
    const burns = [];
    for (let c of ctx.blocks) {
        for (let tx of c.transactions) {
            // decode and normalize the tx data
            burns.push(new model_1.Burn({
                id: tx.id,
                block: c.header.height,
                address: tx.from,
                value: tx.value,
                txHash: tx.hash,
            }));
        }
    }
    // apply vectorized transformations and aggregations
    const burned = burns.reduce((acc, b) => acc + b.value, 0n) / 1000000000n;
    const startBlock = ctx.blocks.at(0)?.header.height;
    const endBlock = ctx.blocks.at(-1)?.header.height;
    ctx.log.info(`Burned ${burned} Gwei from ${startBlock} to ${endBlock}`);
    // upsert batches of entities with batch-optimized ctx.store.save
    await ctx.store.upsert(burns);
});
//# sourceMappingURL=main.js.map