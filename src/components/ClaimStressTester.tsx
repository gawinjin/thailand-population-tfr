import { useMemo, useState } from "react";
import { classifyScenarioDecline, estimateBirthsFromTfrRatio } from "../lib/calculations";
import { formatNumber, formatPercent } from "../lib/formatters";

export function ClaimStressTester() {
  const [baselineBirths, setBaselineBirths] = useState(416514);
  const [targetTfr, setTargetTfr] = useState(0.78);
  const [benchmarkTfr, setBenchmarkTfr] = useState(0.86);
  const [benchmarkBirths, setBenchmarkBirths] = useState(373000);
  const result = useMemo(() => {
    const impliedBirths = estimateBirthsFromTfrRatio(benchmarkBirths, targetTfr, benchmarkTfr);
    const decline = ((baselineBirths - impliedBirths) / baselineBirths) * 100;
    return { impliedBirths, decline, classification: classifyScenarioDecline(decline) };
  }, [baselineBirths, targetTfr, benchmarkTfr, benchmarkBirths]);

  return (
    <div className="calculator">
      <div className="calc-controls">
        <label>Baseline births<input type="number" value={baselineBirths} onChange={(e) => setBaselineBirths(Number(e.target.value))} /></label>
        <label>Target TFR {targetTfr.toFixed(2)}<input type="range" min="0.7" max="1.2" step="0.01" value={targetTfr} onChange={(e) => setTargetTfr(Number(e.target.value))} /></label>
        <label>Benchmark TFR<input type="number" step="0.01" value={benchmarkTfr} onChange={(e) => setBenchmarkTfr(Number(e.target.value))} /></label>
        <label>Benchmark implied births<input type="number" value={benchmarkBirths} onChange={(e) => setBenchmarkBirths(Number(e.target.value))} /></label>
      </div>
      <div className="calc-output">
        <p className="eyebrow">0.78 verdict</p>
        <h3>{formatNumber(result.impliedBirths)} implied births</h3>
        <p>To reach this stress case under the simple proportional assumption, births would need to fall {formatPercent(-result.decline)} from the 2025 level.</p>
        <div className={`scenario-badge ${result.classification}`}>{result.classification.replaceAll("_", " ")}</div>
        <p className="warning">This is a heuristic stress test, not an official TFR calculation. True TFR requires age-specific fertility rates and female population exposure by age.</p>
      </div>
    </div>
  );
}
