import type { ApiEndpoint, QueryResult } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useApiEndpoints,
  useApiStats,
  useExecuteQuery,
  useQueryHistory,
} from "@/hooks/use-apix";
import { cn } from "@/lib/utils";
import { Database, Lock, Plus, Trash2, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const QUERY_TARGETS = [
  "engines",
  "laws",
  "entanglements",
  "passport",
  "builders",
  "curriculum",
  "mltv",
  "sdk",
];
const FIB_LIMITS = [5, 8, 13, 21, 34, 55];

const PURPLE = "oklch(0.72 0.19 280)";
const PURPLE_GLOW = "rgba(160,100,255,0.18)";
const PURPLE_BORDER = "rgba(160,100,255,0.25)";

function methodBadgeStyle(method: string) {
  return method === "UPDATE"
    ? {
        background: "rgba(245,155,0,0.12)",
        color: "oklch(0.76 0.18 84)",
        border: "1px solid rgba(245,155,0,0.25)",
      }
    : {
        background: "rgba(160,100,255,0.12)",
        color: PURPLE,
        border: `1px solid ${PURPLE_BORDER}`,
      };
}

function EndpointCard({
  endpoint,
  selected,
  onClick,
}: {
  endpoint: ApiEndpoint;
  selected: boolean;
  onClick: () => void;
}) {
  const ver = endpoint.version ?? "v1";
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid="api_explorer.endpoint_card"
      className={cn(
        "w-full text-left rounded-xl p-3 transition-smooth hover:bg-white/[0.03] touch-target",
        selected ? "glass" : "glass-sm",
      )}
      style={
        selected
          ? {
              border: `1px solid ${PURPLE_BORDER}`,
              boxShadow: `0 0 16px ${PURPLE_GLOW}`,
            }
          : undefined
      }
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <span className="font-mono text-xs font-bold" style={{ color: PURPLE }}>
          {endpoint.id}
        </span>
        <div className="flex items-center gap-1 shrink-0">
          {endpoint.requiresAuth && (
            <Lock className="h-3 w-3 text-muted-foreground" />
          )}
          <span
            className="text-[10px] font-mono px-1.5 py-0.5 rounded"
            style={methodBadgeStyle(endpoint.method)}
          >
            {endpoint.method}
          </span>
        </div>
      </div>
      <p className="text-sm font-medium text-foreground truncate">
        {endpoint.name}
      </p>
      <p className="text-[11px] font-mono text-muted-foreground truncate mt-0.5">
        {endpoint.path}
      </p>
      <div className="flex items-center gap-2 mt-1.5">
        <span className="text-[10px] text-muted-foreground">
          {endpoint.domain}
        </span>
        <span className="text-[10px] font-mono text-muted-foreground/60">
          {String(ver)}
        </span>
      </div>
    </button>
  );
}

type FilterRow = { id: string; field: string; operator: string; value: string };

function QueryBuilder({ endpoint }: { endpoint: ApiEndpoint | null }) {
  const [target, setTarget] = useState(QUERY_TARGETS[0]);
  const [limit, setLimit] = useState(13);
  const [filters, setFilters] = useState<FilterRow[]>([]);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);

  const executeMutation = useExecuteQuery();
  const { data: history } = useQueryHistory();

  function addFilter() {
    setFilters((f) => [
      ...f,
      { id: crypto.randomUUID(), field: "", operator: "eq", value: "" },
    ]);
  }

  function removeFilter(i: number) {
    setFilters((f) => f.filter((_, idx) => idx !== i));
  }

  function updateFilter(
    i: number,
    key: keyof Omit<FilterRow, "id">,
    val: string,
  ) {
    setFilters((f) =>
      f.map((row, idx) => (idx === i ? { ...row, [key]: val } : row)),
    );
  }

  async function execute() {
    const tuples: [string, string, string][] = filters.map((r) => [
      r.field,
      r.operator,
      r.value,
    ]);
    const res = await executeMutation.mutateAsync({
      target,
      filters: tuples,
      limit: BigInt(limit),
    });
    setResult(res);
  }

  const inputStyle = {
    background: "rgba(12,14,28,0.80)",
    borderColor: PURPLE_BORDER,
    backdropFilter: "blur(8px)",
    color: "inherit",
  };

  return (
    <div className="space-y-4" data-ocid="api_explorer.query_builder">
      {/* Selected endpoint info */}
      {endpoint ? (
        <div
          className="glass rounded-xl p-4 relative overflow-hidden"
          style={{ border: `1px solid ${PURPLE_BORDER}` }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(160,100,255,0.06) 0%, transparent 60%)",
            }}
          />
          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="font-mono text-sm font-bold"
                style={{ color: PURPLE }}
              >
                {endpoint.id}
              </span>
              <span
                className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                style={methodBadgeStyle(endpoint.method)}
              >
                {endpoint.method}
              </span>
              {endpoint.requiresAuth && (
                <Lock className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </div>
            <p className="text-sm font-medium text-foreground">
              {endpoint.name}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {endpoint.description}
            </p>
          </div>
        </div>
      ) : (
        <div
          className="glass-sm rounded-xl p-6 text-center"
          style={{ border: "2px dashed rgba(160,100,255,0.18)" }}
          data-ocid="api_explorer.empty_state"
        >
          <p className="text-sm text-muted-foreground">
            Select an endpoint from the list to begin
          </p>
        </div>
      )}

      {/* Execute Query card */}
      <div
        className="glass-xl rounded-2xl p-5 space-y-4"
        style={{ border: `1px solid ${PURPLE_BORDER}` }}
      >
        <p className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
          Execute Query
        </p>

        {/* Target */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="query-target-select"
            className="text-xs text-muted-foreground w-14 shrink-0"
          >
            Target
          </label>
          <select
            id="query-target-select"
            data-ocid="api_explorer.target_select"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="flex-1 rounded-xl border px-3 py-2 text-sm focus:outline-none"
            style={inputStyle}
          >
            {QUERY_TARGETS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Filters */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-mono">
              Filters
            </span>
            <Button
              type="button"
              size="sm"
              onClick={addFilter}
              data-ocid="api_explorer.add_filter_button"
              className="h-7 text-xs gap-1 font-mono"
              style={{
                background: "rgba(160,100,255,0.10)",
                color: PURPLE,
                border: `1px solid ${PURPLE_BORDER}`,
              }}
            >
              <Plus className="h-3 w-3" /> Add Filter
            </Button>
          </div>
          {filters.map((row, i) => (
            <div key={row.id} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="field"
                value={row.field}
                onChange={(e) => updateFilter(i, "field", e.target.value)}
                className="w-28 rounded-lg border px-2 py-1.5 text-xs focus:outline-none"
                style={inputStyle}
              />
              <select
                value={row.operator}
                onChange={(e) => updateFilter(i, "operator", e.target.value)}
                className="w-20 rounded-lg border px-2 py-1.5 text-xs focus:outline-none"
                style={inputStyle}
              >
                <option value="eq">eq</option>
                <option value="gt">gt</option>
                <option value="lt">lt</option>
                <option value="contains">contains</option>
              </select>
              <input
                type="text"
                placeholder="value"
                value={row.value}
                onChange={(e) => updateFilter(i, "value", e.target.value)}
                className="flex-1 rounded-lg border px-2 py-1.5 text-xs focus:outline-none"
                style={inputStyle}
              />
              <button
                type="button"
                className="h-7 w-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive transition-smooth"
                onClick={() => removeFilter(i)}
                aria-label="Remove filter"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Limit */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="query-limit-select"
            className="text-xs text-muted-foreground w-14 shrink-0"
          >
            Limit
          </label>
          <select
            id="query-limit-select"
            data-ocid="api_explorer.limit_select"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="w-24 rounded-xl border px-3 py-2 text-sm focus:outline-none"
            style={inputStyle}
          >
            {FIB_LIMITS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={execute}
          disabled={executeMutation.isPending}
          data-ocid="api_explorer.execute_button"
          className="w-full flex items-center justify-center gap-2 rounded-xl py-3 font-mono text-sm font-bold transition-smooth"
          style={{
            background: executeMutation.isPending
              ? "rgba(160,100,255,0.08)"
              : "rgba(160,100,255,0.18)",
            color: PURPLE,
            border: `1px solid ${PURPLE_BORDER}`,
            boxShadow: executeMutation.isPending
              ? undefined
              : `0 0 24px ${PURPLE_GLOW}`,
          }}
        >
          <Zap className="h-4 w-4" />
          {executeMutation.isPending ? "Executing..." : "Execute"}
        </button>
      </div>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            data-ocid="api_explorer.results_panel"
          >
            <div
              className="glass-xl rounded-2xl p-5 space-y-3"
              style={{ border: `1px solid ${PURPLE_BORDER}` }}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
                  Results
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      color: "oklch(0.55 0.01 260)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {String(result.totalFound)} found
                  </span>
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded"
                    style={{
                      background: "rgba(160,100,255,0.10)",
                      color: PURPLE,
                      border: `1px solid ${PURPLE_BORDER}`,
                    }}
                  >
                    {String(result.executionCycles)} cycles
                  </span>
                </div>
              </div>
              {result.items.length === 0 ? (
                <p
                  className="text-sm text-muted-foreground text-center py-6"
                  data-ocid="api_explorer.results_empty_state"
                >
                  No items matched.
                </p>
              ) : (
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {result.items.map((item, idx) => (
                    <div
                      key={item.id}
                      className="glass-sm rounded-xl p-3"
                      data-ocid={`api_explorer.result_item.${idx + 1}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-muted-foreground truncate flex-1">
                          {item.id}
                        </span>
                        <span
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                          style={{
                            background: "rgba(160,100,255,0.12)",
                            color: PURPLE,
                            border: `1px solid ${PURPLE_BORDER}`,
                          }}
                        >
                          {String(item.score)}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-foreground whitespace-pre-wrap break-all">
                        {item.data}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Query History */}
      {history && history.length > 0 && (
        <div data-ocid="api_explorer.history_section">
          <button
            type="button"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-smooth mb-2 font-mono"
            onClick={() => setHistoryOpen((p) => !p)}
          >
            Query History ({history.length}){" "}
            <span>{historyOpen ? "▲" : "▼"}</span>
          </button>
          <AnimatePresence initial={false}>
            {historyOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <div className="space-y-2">
                  {history.slice(0, 5).map((r, idx) => (
                    <div
                      key={r.queryId}
                      className="glass-sm rounded-xl p-3 flex items-center gap-3"
                      data-ocid={`api_explorer.history_item.${idx + 1}`}
                    >
                      <span className="text-xs font-mono text-muted-foreground truncate flex-1">
                        {r.queryId}
                      </span>
                      <span
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          color: "oklch(0.55 0.01 260)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        {r.target}
                      </span>
                      <span
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0"
                        style={{
                          background: "rgba(160,100,255,0.10)",
                          color: PURPLE,
                          border: `1px solid ${PURPLE_BORDER}`,
                        }}
                      >
                        {String(r.totalFound)}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default function ApiExplorer() {
  const { data: endpoints, isLoading: endpointsLoading } = useApiEndpoints();
  const { data: apiStats, isLoading: statsLoading } = useApiStats();
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(
    null,
  );

  return (
    <div
      className="mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-6"
      data-ocid="api_explorer.page"
    >
      {/* OS Header */}
      <div
        className="glass-xl rounded-3xl p-8 relative overflow-hidden glass-shimmer"
        style={{ border: `1px solid ${PURPLE_BORDER}` }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 80% -10%, rgba(160,100,255,0.14) 0%, transparent 70%)",
          }}
        />
        <div className="relative">
          <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
            EduAI · APIX · QRYX
          </span>
          <h1
            className="text-3xl font-display font-black tracking-tight mt-1"
            style={{
              color: PURPLE,
              textShadow: `0 0 32px ${PURPLE_GLOW}`,
            }}
          >
            SOVEREIGN API GATEWAY
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            All endpoints versioned and sealed · LEX_RGST enforced
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      {statsLoading ? (
        <div className="flex gap-3">
          {["sk-1", "sk-2", "sk-3"].map((k) => (
            <Skeleton key={k} className="h-10 w-36 rounded-xl" />
          ))}
        </div>
      ) : apiStats ? (
        <div
          className="flex flex-wrap gap-3"
          data-ocid="api_explorer.stats_bar"
        >
          {[
            { label: "Total Endpoints", value: apiStats.totalEndpoints },
            { label: "Total Calls", value: apiStats.totalCalls },
            { label: "Active", value: apiStats.activeEndpoints },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center gap-2 glass-sm rounded-xl px-4 py-2"
              style={{ border: `1px solid ${PURPLE_BORDER}` }}
            >
              <Database className="h-3.5 w-3.5" style={{ color: PURPLE }} />
              <span className="text-xs font-semibold text-muted-foreground">
                {label}
              </span>
              <span
                className="text-sm font-display font-bold"
                style={{ color: PURPLE }}
              >
                {String(value)}
              </span>
            </div>
          ))}
        </div>
      ) : null}

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[20rem_1fr] gap-6">
        {/* Left — Endpoint List */}
        <div
          className="glass-xl rounded-2xl p-4"
          style={{ border: `1px solid ${PURPLE_BORDER}` }}
          data-ocid="api_explorer.endpoint_list"
        >
          <p className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase mb-3">
            Endpoints
          </p>
          {endpointsLoading ? (
            <div className="space-y-2">
              {["sk-e1", "sk-e2", "sk-e3", "sk-e4", "sk-e5"].map((k) => (
                <div key={k} className="glass-sm rounded-xl h-20" />
              ))}
            </div>
          ) : endpoints && endpoints.length > 0 ? (
            <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
              {endpoints.map((ep) => (
                <EndpointCard
                  key={ep.id}
                  endpoint={ep}
                  selected={selectedEndpoint?.id === ep.id}
                  onClick={() => setSelectedEndpoint(ep)}
                />
              ))}
            </div>
          ) : (
            <div
              className="text-center py-16"
              data-ocid="api_explorer.empty_state"
            >
              <Database
                className="h-10 w-10 mx-auto mb-3"
                style={{ color: PURPLE_GLOW }}
              />
              <p className="text-sm text-muted-foreground">
                No endpoints registered yet.
              </p>
            </div>
          )}
        </div>

        {/* Right — Query Builder */}
        <div data-ocid="api_explorer.builder_panel">
          <QueryBuilder endpoint={selectedEndpoint} />
        </div>
      </div>
    </div>
  );
}
