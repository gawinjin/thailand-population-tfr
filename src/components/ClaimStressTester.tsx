import { useState } from "react";
import { classifyScenarioDecline, estimateBirthsFromTfrRatio } from "../lib/calculations";
import { latestDemographics } from "../data/demographics";
import { formatNumber, formatPercent } from "../lib/formatters";

export function ClaimStressTester() {
  const [baselineBirths, setBaselineBirths] = useState(latestDemographics.registered_births);
  const [targetTfr, setTargetTfr] = useState(0.78);
  const [benchmarkTfr, setBenchmarkTfr] = useState(0.86);
  const [benchmarkBirths, setBenchmarkBirths] = useState(373000);
  const valid = [baselineBirths, targetTfr, benchmarkTfr, benchmarkBirths].every(value => Number.isFinite(value) && value > 0);
  const impliedBirths = valid ? estimateBirthsFromTfrRatio(benchmarkBirths, targetTfr, benchmarkTfr) : null;
  const change = impliedBirths === null ? null : (impliedBirths / baselineBirths - 1) * 100;
  return (
    <div className="calculator">
      <div className="calc-controls">
        <label>Baseline births<input min="1" type="number" value={baselineBirths} onChange={e => setBaselineBirths(Number(e.target.value))} /></label>
        <label>Target TFR {targetTfr.toFixed(2)}<input type="range" min="0.7" max="1.2" step="0.01" value={targetTfr} onChange={e => setTargetTfr(Number(e.target.value))} /></label>
        <label>Benchmark TFR<input min="0.01" type="number" step="0.01" value={benchmarkTfr} onChange={e => setBenchmarkTfr(Number(e.target.value))} /></label>
        <label>Benchmark implied births<input min="1" type="number" value={benchmarkBirths} onChange={e => setBenchmarkBirths(Number(e.target.value))} /></label>
        <p>373,000 is an approximate model anchor associated with the 0.86 estimate, not a registered birth count.</p>
      </div>
      <div className="calc-output" aria-live="polite">
        <p className="eyebrow">Heuristic sensitivity test</p>
        {!valid ? <p role="alert">All birth and TFR inputs must be positive.</p> : <>
          <h3>{formatNumber(impliedBirths)} implied births</h3>
          <p>Change from the selected baseline of {formatNumber(baselineBirths)} births: {formatPercent(change)}.</p>
          <div className="scenario-badge">{change! > 0 ? "Increase scenario" : classifyScenarioDecline(-change!).replaceAll("_", " ")}</div>
          <p>Difference from benchmark implied births: {formatNumber(impliedBirths! - benchmarkBirths)}.</p>
        </>}
        <p className="warning">Arithmetic scenario, not official projection. Severity bands are descriptive, not probabilities. This ratio holds age structure and fertility timing constant; true TFR requires age-specific fertility rates and female exposure by age. The 0.78 claim remains unverified.</p>
      </div>
    </div>
  );
}
