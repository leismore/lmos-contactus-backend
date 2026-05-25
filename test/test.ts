/**
 * Fake test: always success.
 */

import test from 'node:test';
import assert from 'node:assert';

test('Always success test', () => {
    assert.strictEqual(true, true);
});
