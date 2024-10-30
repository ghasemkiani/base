import test from "node:test";
import assert from "node:assert";

import { cutil } from "@ghasemkiani/base";

test("cutil.isNumber", async (t) => {
  assert.ok(cutil.isNumber(Infinity) === true);
  assert.ok(cutil.isNumber(-Infinity) === true);
  assert.ok(cutil.isNumber(1n) === true);
  assert.ok(cutil.isNumber(1) === true);
  assert.ok(cutil.isNumber(-3.14) === true);
  assert.ok(cutil.isNumber(undefined) === false);
  assert.ok(cutil.isNumber(null) === false);
  assert.ok(cutil.isNumber("") === false);
  assert.ok(cutil.isNumber("1") === true);
  assert.ok(cutil.isNumber("-3.14") === true);
  assert.ok(cutil.isNumber("one") === false);
});

test("cutil.asNumber", async (t) => {
  assert.ok(cutil.asNumber(Infinity) === Infinity);
  assert.ok(cutil.asNumber(-Infinity) === -Infinity);
  assert.ok(cutil.asNumber(1n) === 1);
  assert.ok(cutil.asNumber(1) === 1);
  assert.ok(cutil.asNumber(-3.14) === -3.14);
  assert.ok(cutil.asNumber(undefined) === 0);
  assert.ok(cutil.asNumber(null) === 0);
  assert.ok(cutil.asNumber("") === 0);
  assert.ok(cutil.asNumber("1") === 1);
  assert.ok(cutil.asNumber("-3.14") === -3.14);
  assert.ok(cutil.asNumber("one") === 0);
});

test("cutil", async (t) => {
  assert.ok(cutil.isBigInt(Infinity) === false);
  assert.ok(cutil.isInteger(Infinity) === false);
  assert.throws(() => cutil.asBigInt(Infinity));
  assert.ok(cutil.asBigInt("") === 0n);
  assert.ok(cutil.asBigInt(1) === 1n);
  assert.ok(cutil.asBigInt(1n) === 1n);
});
