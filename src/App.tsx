import { BirthDeathChart } from "./components/BirthDeathChart";
import { CauseNetwork } from "./components/CauseNetwork";
import { ClaimStressTester } from "./components/ClaimStressTester";
import { DataGaps } from "./components/DataGaps";
import { DownloadData } from "./components/DownloadData";
import { EvidenceHierarchy } from "./components/EvidenceHierarchy";
import { FertilitySourceComparison } from "./components/FertilitySourceComparison";
import { HeroStats } from "./components/HeroStats";
import { NaturalChangeChart } from "./components/NaturalChangeChart";
import { PolicyLevers } from "./components/PolicyLevers";
import { PopulationStockChart } from "./components/PopulationStockChart";
import { ScenarioExplorer } from "./components/ScenarioExplorer";
import { Section } from "./components/Section";
import { SourceRegistry } from "./components/SourceRegistry";

export function App() {
  return (
    <main>
      <HeroStats />
      <Section id="trends" eyebrow="Birth and death trends" question="When did Thailand cross from natural increase to natural decrease?" note="Toggle between counts, index and year-on-year change. Hover any year to inspect status, cutoff and source notes.">
        <BirthDeathChart />
      </Section>
      <Section id="natural-change" eyebrow="Natural population change" question="How large is the registration-based deficit?" note="Click a bar to recalculate cumulative natural decrease from 2021 to that year.">
        <NaturalChangeChart />
      </Section>
      <Section id="population-stock" eyebrow="Registered population stock" question="Has the registered population already started contracting?">
        <PopulationStockChart />
      </Section>
      <Section id="tfr" eyebrow="Fertility rate source reconciliation" question="Why do different sources report different fertility rates?" note="Total fertility rate is not a birth count. It is a synthetic measure based on age-specific fertility rates.">
        <FertilitySourceComparison />
      </Section>
      <Section id="stress-test" eyebrow="0.78 claim stress test" question="Is a 0.78 TFR claim realistic, official, or a downside scenario?" note="The 0.78 figure is plausible as a downside scenario, but the current research does not validate it as Thailand's official 2026 fertility rate.">
        <ClaimStressTester />
      </Section>
      <Section id="causes" eyebrow="Cause system map" question="Is the cause simply that people do not want children?" note="The surface story is cost of living. The deeper story is that family formation has become a high-risk household project.">
        <CauseNetwork />
      </Section>
      <Section id="scenarios" eyebrow="Scenario explorer" question="Where could births and natural change head by 2030, 2035 and 2040?" note="Thailand must plan for mitigation and adaptation: making family formation less punishing while preparing for an older, more care-intensive society.">
        <ScenarioExplorer />
      </Section>
      <Section id="evidence" eyebrow="Evidence hierarchy" question="Which data should be trusted for which claim?">
        <EvidenceHierarchy />
      </Section>
      <Section id="gaps" eyebrow="Data gaps" question="What do we still not know?">
        <DataGaps />
      </Section>
      <Section id="policy" eyebrow="Policy levers" question="What can policy affect, and what can it not promise?">
        <PolicyLevers />
      </Section>
      <Section id="sources" eyebrow="Source transparency" question="Where did each measure come from?" note="Source disagreements are exposed intentionally. Official counts, expert estimates, international benchmarks and unverified claims answer different questions.">
        <DownloadData />
        <SourceRegistry />
      </Section>
    </main>
  );
}
