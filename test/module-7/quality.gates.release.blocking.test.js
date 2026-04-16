const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');

// File purpose:
// This file teaches quality gates used to block risky releases.
// Team-lead scenario:
// "Only allow deployment if pass rate, latency, and flaky rate are within thresholds."
// Why this matters:
// - Converts test outcomes into release decisions.
// - Prevents shipping with known instability.
// API-specific behavior:
// - Reads threshold config from data/quality-gates.json
// - Uses sample pipeline metrics and validates against configured limits.
// Sample quality metrics:
// - passRate: 0.98
// - p95LatencyMs: 850
// - flakyRate: 0.02
// Where to see values:
// - Add console.log({ gates, pipelineMetrics })
// Quick memory:
// Quality gate = automatic yes/no decision for release.

test.describe('Module 7 - Quality Gates and Release Blocking', () => {
  test('validates pipeline metrics against configured quality gates', async () => {
    // Read gates configuration.
    const gatesPath = path.join(__dirname, 'data', 'quality-gates.json');
    const gates = JSON.parse(fs.readFileSync(gatesPath, 'utf8'));

    // Sample pipeline metrics (can come from CI artifacts in real setup).
    const pipelineMetrics = {
      passRate: 0.98,
      p95LatencyMs: 850,
      flakyRate: 0.02
    };

    // Gate 1: pass rate must be high enough.
    expect(pipelineMetrics.passRate).toBeGreaterThanOrEqual(gates.minPassRate);

    // Gate 2: p95 latency must stay below threshold.
    expect(pipelineMetrics.p95LatencyMs).toBeLessThanOrEqual(gates.maxP95LatencyMs);

    // Gate 3: flaky rate must remain low.
    expect(pipelineMetrics.flakyRate).toBeLessThanOrEqual(gates.maxFlakyRate);
  });
});
