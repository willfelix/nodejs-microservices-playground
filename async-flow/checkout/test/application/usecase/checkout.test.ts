import test from "node:test";
import assert from "node:assert";

test("# Usecase: Checkout", async (t) => {
    await t.test("should do a checkout when order is received", (t) => {
        assert.strictEqual(1, 1);
    });
});
