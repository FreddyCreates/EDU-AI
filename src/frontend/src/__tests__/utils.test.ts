import { describe, it, expect } from "vitest";
import { cn } from "../lib/utils";

describe("cn utility function", () => {
  describe("basic functionality", () => {
    it("should return empty string for no inputs", () => {
      expect(cn()).toBe("");
    });

    it("should return single class name unchanged", () => {
      expect(cn("text-red-500")).toBe("text-red-500");
    });

    it("should merge multiple class names", () => {
      expect(cn("text-red-500", "bg-blue-500")).toBe("text-red-500 bg-blue-500");
    });
  });

  describe("conditional classes", () => {
    it("should handle boolean conditions - true", () => {
      expect(cn("base", true && "active")).toBe("base active");
    });

    it("should handle boolean conditions - false", () => {
      expect(cn("base", false && "inactive")).toBe("base");
    });

    it("should handle undefined values", () => {
      expect(cn("base", undefined, "other")).toBe("base other");
    });

    it("should handle null values", () => {
      expect(cn("base", null, "other")).toBe("base other");
    });
  });

  describe("tailwind merge behavior", () => {
    it("should merge conflicting width classes", () => {
      expect(cn("w-full", "w-1/2")).toBe("w-1/2");
    });

    it("should merge conflicting padding classes", () => {
      expect(cn("p-4", "p-8")).toBe("p-8");
    });

    it("should merge conflicting text color classes", () => {
      expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
    });

    it("should merge conflicting background color classes", () => {
      expect(cn("bg-white", "bg-black")).toBe("bg-black");
    });

    it("should keep non-conflicting classes", () => {
      expect(cn("text-red-500", "bg-blue-500", "p-4")).toBe(
        "text-red-500 bg-blue-500 p-4"
      );
    });

    it("should merge conflicting margin classes", () => {
      expect(cn("m-2", "m-4")).toBe("m-4");
    });

    it("should merge specific margin overrides", () => {
      expect(cn("mx-4", "mx-2")).toBe("mx-2");
    });

    it("should handle responsive prefixes", () => {
      expect(cn("md:w-full", "md:w-1/2")).toBe("md:w-1/2");
    });
  });

  describe("array inputs", () => {
    it("should handle array of classes", () => {
      expect(cn(["text-sm", "font-bold"])).toBe("text-sm font-bold");
    });

    it("should handle nested arrays", () => {
      expect(cn("base", ["nested", "classes"])).toBe("base nested classes");
    });
  });

  describe("object inputs", () => {
    it("should handle object with true values", () => {
      expect(cn({ active: true, disabled: false })).toBe("active");
    });

    it("should handle mixed inputs", () => {
      expect(cn("base", { active: true }, ["extra"])).toBe("base active extra");
    });
  });

  describe("edge cases", () => {
    it("should handle empty string inputs", () => {
      expect(cn("", "valid", "")).toBe("valid");
    });

    it("should handle whitespace-only inputs", () => {
      expect(cn("  ", "valid", "  ")).toBe("valid");
    });

    it("should handle complex component styling scenario", () => {
      const isActive = true;
      const isDisabled = false;
      const result = cn(
        "px-4 py-2 rounded",
        isActive && "bg-primary text-primary-foreground",
        isDisabled && "opacity-50 cursor-not-allowed",
        "hover:bg-primary/90"
      );
      expect(result).toBe(
        "px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90"
      );
    });
  });
});
