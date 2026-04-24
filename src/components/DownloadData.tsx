import { causeEdges, causeNodes } from "../data/causeNetwork";
import { demographicRows, enrichedDemographics } from "../data/demographics";
import { fertilitySources } from "../data/fertilitySources";
import { policyLevers } from "../data/policyLevers";
import { sourceRegistry } from "../data/sourceRegistry";
import { downloadText, rowsToCsv } from "../lib/exportCsv";

export function DownloadData() {
  const bundle = { demographicRows, enrichedDemographics, fertilitySources, causeNodes, causeEdges, sourceRegistry, policyLevers };
  return (
    <div className="download-row">
      <button onClick={() => downloadText("thailand-fertility-data.json", JSON.stringify(bundle, null, 2), "application/json")}>Download JSON</button>
      <button onClick={() => downloadText("thailand-demographics.csv", rowsToCsv(enrichedDemographics), "text/csv")}>Download CSV</button>
    </div>
  );
}
