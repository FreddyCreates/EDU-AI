import { createActor } from "@/backend";
import type { SdkEntry } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export const STATIC_SDK_ENTRIES: SdkEntry[] = [
  {
    id: "sdk-skai-docens",
    name: "EduAI Teaching Interface",
    version: "1.0.0",
    description:
      "The sovereign teacher interface. Routes students to the right learning engine based on what they want to create, not just what they want to study. Every session produces an artifact.",
    category: "teaching",
    accessProtocol: "NEXUM-GATE",
    entryPoints: [
      "skaiTeach(studentIntent)",
      "skaiRoute(intent, engineId, summary)",
      "getSkaiDocensInfo()",
    ],
    status: "active",
  },
  {
    id: "sdk-passport",
    name: "Student Passport",
    version: "1.0.0",
    description:
      "Sovereign on-chain passport system. Every session is compressed into a kernel seed and sealed permanently to the student. No session is ever lost — the passport compounds across a lifetime of learning.",
    category: "passport",
    accessProtocol: "LEX_MEMORIA",
    entryPoints: [
      "createSovereignPassport(name, grade, collegium)",
      "getSovereignPassport()",
      "sealKernelSeed(seed)",
      "getKernelSeeds()",
    ],
    status: "active",
  },
  {
    id: "sdk-engine-query",
    name: "Engine Query Interface",
    version: "1.0.0",
    description:
      "Direct access to all 8 sovereign learning engines. Each engine uses pure math and geometry functions to produce deterministic, sovereign intelligence. No external services — all processing lives inside the platform.",
    category: "interaction",
    accessProtocol: "ENGINE-DISPATCH",
    entryPoints: [
      "queryEngine(engineId, input, context)",
      "queryEngineWithPassport(engineId, input, context)",
      "getEngines()",
      "getEngineById(id)",
    ],
    status: "active",
  },
  {
    id: "sdk-registry",
    name: "Registry Access",
    version: "1.0.0",
    description:
      "Read and query all sovereign registries — laws, agents, engines, SDK entries. The registry layer is the permanent directory of everything that operates inside the platform.",
    category: "registry",
    accessProtocol: "REGISTRY-PROTOCOL",
    entryPoints: [
      "getLaws()",
      "getAgents()",
      "getEngines()",
      "getSdkEntries()",
      "getSdkEntriesByCategory(cat)",
    ],
    status: "active",
  },
  {
    id: "sdk-collegium",
    name: "Collegium Entry",
    version: "1.0.0",
    description:
      "The college enrollment layer. Students enter through NEXUM-GATE, are assigned to a collegium, and begin building their sovereign learning path. Three public tracks are available with no docking required.",
    category: "collegium",
    accessProtocol: "LEX_ADOPTIO",
    entryPoints: [
      "enterNexumGate(collegium, timestamp)",
      "getTracks()",
      "enrollInTrack(trackId, timestamp)",
      "advanceTrackStep(trackId, artifact, timestamp)",
    ],
    status: "active",
  },
  {
    id: "sdk-curriculum",
    name: "Curriculum & Subjects",
    version: "1.0.0",
    description:
      "Full K–12 curriculum surface. Subjects and topics are preloaded for every grade level with TEKS alignment. Students query by grade and subject — the engine handles the rest.",
    category: "curriculum",
    accessProtocol: "CURRICULUM-PROTOCOL",
    entryPoints: [
      "getSubjectsByGrade(gradeLevel)",
      "getTopicsBySubject(subjectId)",
      "getTrackById(id)",
    ],
    status: "active",
  },
];

export function useSdkEntries() {
  const { actor, isFetching } = useActor(createActor);

  const query = useQuery<SdkEntry[]>({
    queryKey: ["sdk-entries"],
    queryFn: async (): Promise<SdkEntry[]> => {
      if (!actor) return [];
      return actor.getSdkEntries();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 60,
  });

  return {
    entries: query.data ?? [],
    isLoading: query.isLoading || isFetching,
    isError: query.isError,
  };
}

export function useSdkEntriesByCategory(category: string) {
  const { actor, isFetching } = useActor(createActor);

  const query = useQuery<SdkEntry[]>({
    queryKey: ["sdk-entries", "category", category],
    queryFn: async (): Promise<SdkEntry[]> => {
      if (!actor) return [];
      if (category === "All") return actor.getSdkEntries();
      return actor.getSdkEntriesByCategory(category);
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 60,
  });

  return {
    entries: query.data ?? [],
    isLoading: query.isLoading || isFetching,
    isError: query.isError,
  };
}

export function useSdkEntryById(id: string) {
  const { actor, isFetching } = useActor(createActor);

  const query = useQuery<SdkEntry | null>({
    queryKey: ["sdk-entry", id],
    queryFn: async (): Promise<SdkEntry | null> => {
      if (!actor) return null;
      const result = await actor.getSdkEntryById(id);
      if (!result) return null;
      return result[0] ?? null;
    },
    enabled: !!actor && !isFetching && !!id,
    staleTime: 1000 * 60 * 60,
  });

  return {
    entry: query.data ?? null,
    isLoading: query.isLoading || isFetching,
    isError: query.isError,
  };
}
