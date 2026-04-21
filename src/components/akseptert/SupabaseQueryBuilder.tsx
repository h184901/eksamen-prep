"use client";

import { useMemo, useState } from "react";

type TableId = "profiles" | "company_profiles" | "jobs" | "material_prices";
type FilterOp = "eq" | "neq" | "ilike" | "gt" | "lt" | "in";
type Modifier = "none" | "single" | "maybeSingle" | "limit";

interface TableDef {
  name: TableId;
  columns: string[];
  javaEntity: string;
}

const tables: Record<TableId, TableDef> = {
  profiles: {
    name: "profiles",
    columns: ["id", "is_pro", "scans_remaining", "stripe_customer_id", "plan"],
    javaEntity: "Profile",
  },
  company_profiles: {
    name: "company_profiles",
    columns: ["user_id", "name", "trade", "inbound_email", "default_material_markup"],
    javaEntity: "CompanyProfile",
  },
  jobs: {
    name: "jobs",
    columns: ["id", "user_id", "title", "status", "source", "created_at"],
    javaEntity: "Job",
  },
  material_prices: {
    name: "material_prices",
    columns: ["id", "user_id", "name", "price", "unit"],
    javaEntity: "MaterialPrice",
  },
};

const filterOpLabel: Record<FilterOp, string> = {
  eq: "= (eq)",
  neq: "!= (neq)",
  ilike: "ILIKE (ilike)",
  gt: "> (gt)",
  lt: "< (lt)",
  in: "IN (in)",
};

const filterOpSql: Record<FilterOp, string> = {
  eq: "=",
  neq: "!=",
  ilike: "ILIKE",
  gt: ">",
  lt: "<",
  in: "IN",
};

function formatValue(raw: string, op: FilterOp): string {
  if (op === "in") {
    return raw;
  }
  if (/^-?\d+(\.\d+)?$/.test(raw.trim())) return raw.trim();
  if (raw === "true" || raw === "false" || raw === "null") return raw;
  return `"${raw}"`;
}

function sqlValue(raw: string, op: FilterOp): string {
  if (op === "in") {
    const parts = raw.split(",").map((p) => p.trim()).filter(Boolean);
    return `(${parts.map((p) => (/^-?\d+/.test(p) ? p : `'${p.replace(/^['"]|['"]$/g, "")}'`)).join(", ")})`;
  }
  if (/^-?\d+(\.\d+)?$/.test(raw.trim())) return raw.trim();
  if (raw === "true" || raw === "false" || raw === "null") return raw;
  return `'${raw.replace(/^['"]|['"]$/g, "")}'`;
}

export default function SupabaseQueryBuilder() {
  const [table, setTable] = useState<TableId>("company_profiles");
  const [selectedCols, setSelectedCols] = useState<Set<string>>(
    new Set(["user_id", "name", "trade"]),
  );
  const [hasFilter, setHasFilter] = useState(true);
  const [filterCol, setFilterCol] = useState("user_id");
  const [filterOp, setFilterOp] = useState<FilterOp>("eq");
  const [filterVal, setFilterVal] = useState("user_123");
  const [modifier, setModifier] = useState<Modifier>("maybeSingle");
  const [limitValue, setLimitValue] = useState(10);

  const def = tables[table];

  // Når tabellen bytter, oppdater kolonne-valget hvis gjeldende kolonner ikke finnes.
  const resolvedCols = useMemo(() => {
    const out = new Set<string>();
    for (const c of selectedCols) {
      if (def.columns.includes(c)) out.add(c);
    }
    if (out.size === 0) out.add(def.columns[0]);
    return out;
  }, [selectedCols, def]);

  const filterColResolved = def.columns.includes(filterCol)
    ? filterCol
    : def.columns[0];

  const colList = def.columns
    .filter((c) => resolvedCols.has(c))
    .join(", ") || "*";

  // Generere Supabase-kode
  const supabaseCode = useMemo(() => {
    const lines = [
      `const { data, error } = await supabase`,
      `    .from("${def.name}")`,
      `    .select("${colList}")`,
    ];
    if (hasFilter) {
      const valStr = formatValue(filterVal, filterOp);
      lines.push(`    .${filterOp}("${filterColResolved}", ${valStr})`);
    }
    if (modifier === "limit") lines.push(`    .limit(${limitValue})`);
    if (modifier === "single") lines.push(`    .single();`);
    else if (modifier === "maybeSingle") lines.push(`    .maybeSingle();`);
    else if (modifier === "none" || modifier === "limit")
      lines[lines.length - 1] = lines[lines.length - 1] + ";";

    return lines.join("\n");
  }, [def, colList, hasFilter, filterOp, filterColResolved, filterVal, modifier, limitValue]);

  // Generere SQL
  const sqlCode = useMemo(() => {
    let sql = `SELECT ${colList} FROM ${def.name}`;
    if (hasFilter) {
      sql += `\nWHERE ${filterColResolved} ${filterOpSql[filterOp]} ${sqlValue(filterVal, filterOp)}`;
    }
    if (modifier === "limit") sql += `\nLIMIT ${limitValue}`;
    else if (modifier === "single" || modifier === "maybeSingle") sql += `\nLIMIT 1`;
    return sql + ";";
  }, [def, colList, hasFilter, filterColResolved, filterOp, filterVal, modifier, limitValue]);

  // Generere JPA/Hibernate-kode
  const jpaCode = useMemo(() => {
    const methodName = hasFilter
      ? `findBy${filterColResolved
          .split("_")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join("")}${filterOp === "ilike" ? "ContainingIgnoreCase" : ""}`
      : "findAll";

    if (modifier === "single" || modifier === "maybeSingle") {
      return `@Repository
public interface ${def.javaEntity}Repository
    extends JpaRepository<${def.javaEntity}, Long> {

  Optional<${def.javaEntity}> ${methodName}(${hasFilter ? `String ${filterColResolved}` : ""});
}

// Bruk:
Optional<${def.javaEntity}> result =
    repo.${methodName}(${hasFilter ? `"${filterVal.replace(/"/g, "")}"` : ""});`;
    }
    return `@Repository
public interface ${def.javaEntity}Repository
    extends JpaRepository<${def.javaEntity}, Long> {

  List<${def.javaEntity}> ${methodName}(${hasFilter ? `String ${filterColResolved}` : ""}${modifier === "limit" ? `, Pageable pageable` : ""});
}

// Bruk:
List<${def.javaEntity}> results = repo.${methodName}(
    ${hasFilter ? `"${filterVal.replace(/"/g, "")}"${modifier === "limit" ? `, PageRequest.of(0, ${limitValue})` : ""}` : modifier === "limit" ? `PageRequest.of(0, ${limitValue})` : ""});`;
  }, [def, hasFilter, filterColResolved, filterOp, filterVal, modifier, limitValue]);

  function toggleCol(c: string) {
    setSelectedCols((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  }

  return (
    <div className="rounded-xl border border-akseptert-400/40 bg-[var(--card)] overflow-hidden">
      {/* Kontroller */}
      <div className="p-4 border-b border-[var(--card-border)] bg-neutral-50 dark:bg-neutral-900/50">
        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] mb-1">
              Tabell
            </label>
            <div className="flex flex-wrap gap-1">
              {(Object.keys(tables) as TableId[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTable(t)}
                  className={`text-[11px] font-mono px-2 py-1 rounded border transition-colors ${
                    table === t
                      ? "border-akseptert-500 bg-akseptert-50 dark:bg-akseptert-950/40"
                      : "border-[var(--card-border)] hover:border-akseptert-400/60"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] mb-1">
              Modifier
            </label>
            <div className="flex flex-wrap gap-1">
              {(["none", "maybeSingle", "single", "limit"] as Modifier[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setModifier(m)}
                  className={`text-[11px] font-mono px-2 py-1 rounded border transition-colors ${
                    modifier === m
                      ? "border-akseptert-500 bg-akseptert-50 dark:bg-akseptert-950/40"
                      : "border-[var(--card-border)] hover:border-akseptert-400/60"
                  }`}
                >
                  {m}
                </button>
              ))}
              {modifier === "limit" && (
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={limitValue}
                  onChange={(e) => setLimitValue(parseInt(e.target.value || "1", 10))}
                  className="w-14 text-[11px] font-mono px-1.5 py-1 rounded border border-[var(--card-border)] bg-[var(--background)]"
                />
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] mb-1">
            Kolonner i SELECT
          </label>
          <div className="flex flex-wrap gap-1">
            {def.columns.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggleCol(c)}
                className={`text-[11px] font-mono px-2 py-1 rounded border transition-colors ${
                  resolvedCols.has(c)
                    ? "border-akseptert-500 bg-akseptert-50 dark:bg-akseptert-950/40"
                    : "border-[var(--card-border)] hover:border-akseptert-400/60 opacity-60"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 border-t border-[var(--card-border)] pt-3">
          <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer mb-2">
            <input
              type="checkbox"
              checked={hasFilter}
              onChange={(e) => setHasFilter(e.target.checked)}
              className="accent-akseptert-500"
            />
            <span>WHERE-filter</span>
          </label>
          {hasFilter && (
            <div className="grid grid-cols-[1fr_1fr_1fr] gap-2">
              <select
                value={filterColResolved}
                onChange={(e) => setFilterCol(e.target.value)}
                className="text-[11px] font-mono px-2 py-1.5 rounded border border-[var(--card-border)] bg-[var(--background)]"
              >
                {def.columns.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select
                value={filterOp}
                onChange={(e) => setFilterOp(e.target.value as FilterOp)}
                className="text-[11px] font-mono px-2 py-1.5 rounded border border-[var(--card-border)] bg-[var(--background)]"
              >
                {(Object.keys(filterOpLabel) as FilterOp[]).map((o) => (
                  <option key={o} value={o}>{filterOpLabel[o]}</option>
                ))}
              </select>
              <input
                type="text"
                value={filterVal}
                onChange={(e) => setFilterVal(e.target.value)}
                placeholder={filterOp === "in" ? "1, 2, 3" : filterOp === "ilike" ? "%søk%" : "verdi"}
                className="text-[11px] font-mono px-2 py-1.5 rounded border border-[var(--card-border)] bg-[var(--background)]"
              />
            </div>
          )}
        </div>
      </div>

      {/* Tre kolonner: TS Supabase, SQL, JPA */}
      <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[var(--card-border)]">
        <div>
          <div className="px-3 py-1.5 bg-akseptert-500/10 text-[10px] font-bold uppercase tracking-wide text-akseptert-700 dark:text-akseptert-200">
            Supabase (TypeScript)
          </div>
          <pre className="bg-neutral-950 text-neutral-100 text-[11.5px] font-mono p-3 overflow-x-auto min-h-[180px]">
            <code className="whitespace-pre">{supabaseCode}</code>
          </pre>
        </div>
        <div>
          <div className="px-3 py-1.5 bg-sky-500/10 text-[10px] font-bold uppercase tracking-wide text-sky-700 dark:text-sky-200">
            Rå SQL
          </div>
          <pre className="bg-neutral-950 text-neutral-100 text-[11.5px] font-mono p-3 overflow-x-auto min-h-[180px]">
            <code className="whitespace-pre">{sqlCode}</code>
          </pre>
        </div>
        <div>
          <div className="px-3 py-1.5 bg-orange-500/10 text-[10px] font-bold uppercase tracking-wide text-orange-700 dark:text-orange-200">
            Java + JPA/Hibernate
          </div>
          <pre className="bg-neutral-950 text-neutral-100 text-[11.5px] font-mono p-3 overflow-x-auto min-h-[180px]">
            <code className="whitespace-pre">{jpaCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
