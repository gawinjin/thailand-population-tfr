import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  question,
  children,
  note
}: {
  id: string;
  eyebrow: string;
  question: string;
  children: ReactNode;
  note?: string;
}) {
  return (
    <section id={id} className="section">
      <div className="section-header">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{question}</h2>
        {note ? <p className="section-note">{note}</p> : null}
      </div>
      {children}
    </section>
  );
}
