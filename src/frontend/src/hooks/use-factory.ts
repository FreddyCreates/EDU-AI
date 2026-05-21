import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useFactoryStatus() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<{
    adminExists: boolean;
    factoryLocked: boolean;
    studentCount: bigint;
  } | null>({
    queryKey: ["factory-status-full"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.factoryStatus();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useInitFactory() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<string, Error, { adminName: string }>({
    mutationFn: async ({ adminName }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.initFactory(adminName);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (msg) => {
      toast.success(msg ?? "Factory initialized.");
      queryClient.invalidateQueries({ queryKey: ["factory-status-full"] });
      queryClient.invalidateQueries({ queryKey: ["factory-status"] });
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Factory init failed.");
    },
  });
}

export function useCreateFactoryStudent() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<string, Error, { username: string; gradeLevel: string }>({
    mutationFn: async ({ username, gradeLevel }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.createFactoryStudent(username, gradeLevel);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (msg) => {
      toast.success(msg ?? "Student account created.");
      queryClient.invalidateQueries({ queryKey: ["factory-status-full"] });
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Failed to create student.");
    },
  });
}

// Legacy — keep for backward compat
export function useFactorySetup(): {
  setupFactory: (adminName: string) => void;
  isPending: boolean;
} {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (adminName: string) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.factoryAdminSetup(adminName);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (msg) => {
      toast.success(msg ?? "Factory setup complete. Admin account activated.");
      queryClient.invalidateQueries({ queryKey: ["factory-status"] });
      queryClient.invalidateQueries({ queryKey: ["factory-status-full"] });
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Factory setup failed.");
    },
  });

  return {
    setupFactory: (adminName: string) => mutation.mutate(adminName),
    isPending: mutation.isPending,
  };
}
