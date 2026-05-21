import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useState } from "react";

export function useEddiMode() {
  const [mode, setMode] = useState<string>("STUDENT_MODE");
  return { mode, setMode };
}

export function useEddiChat() {
  const { actor } = useActor(createActor);
  const [isLoading, setIsLoading] = useState(false);

  const chat = async (message: string, mode: string): Promise<string> => {
    setIsLoading(true);
    try {
      if (actor) {
        return await actor.askAgent(
          "EDDI",
          message,
          mode,
          "general",
          "all",
          BigInt(Date.now()),
        );
      }
      return "EDDI is processing your request through the sovereign intelligence layer...";
    } catch {
      return "EDDI encountered a brief interruption. Your learning continues.";
    } finally {
      setIsLoading(false);
    }
  };

  return { chat, isLoading };
}
