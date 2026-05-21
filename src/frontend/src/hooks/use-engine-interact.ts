import { createActor } from "@/backend";
import type { KernelSeed } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation } from "@tanstack/react-query";

// ─── queryEngine ─────────────────────────────────────────────────────────────
export function useEngineQuery(engineId: string) {
  const { actor } = useActor(createActor);

  return useMutation<string, Error, { userInput: string; context?: string }>({
    mutationFn: async ({ userInput, context = "" }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.queryEngine(engineId, userInput, context);
    },
  });
}

// ─── queryEngineWithPassport ──────────────────────────────────────────────────
export function useEngineQueryWithPassport(engineId: string) {
  const { actor } = useActor(createActor);

  return useMutation<
    { response: string; seedGenerated: KernelSeed },
    Error,
    { userInput: string; context?: string }
  >({
    mutationFn: async ({ userInput, context = "" }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.queryEngineWithPassport(engineId, userInput, context);
    },
  });
}
