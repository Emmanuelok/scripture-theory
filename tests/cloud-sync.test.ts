import { describe, it, expect } from "vitest";
import { mergeProfiles } from "@/lib/cloud-sync";
import type { Profile } from "@/lib/profile";

describe("cloud-sync.mergeProfiles", () => {
  it("union-merges memory (keyed by verseId) instead of wiping it", () => {
    // Regression: memory was omitted from the id-merge and used a leaner local
    // blob to overwrite a fuller cloud one — silent cross-device data loss.
    const local: Profile = {
      memory: [{ verseId: "john-1-1", startedAt: "x", attempts: 3, level: "recited" }],
    };
    const cloud: Partial<Profile> = {
      memory: [
        { verseId: "john-1-1", startedAt: "y", attempts: 1, level: "reading" },
        { verseId: "psalm-23-1", startedAt: "z", attempts: 2, level: "blanks" },
      ],
    };
    const merged = mergeProfiles(local, cloud);
    const ids = (merged.memory ?? []).map((m) => m.verseId).sort();
    expect(ids).toEqual(["john-1-1", "psalm-23-1"]);
    // local wins on collision
    expect(merged.memory?.find((m) => m.verseId === "john-1-1")?.attempts).toBe(3);
  });

  it("union-merges nationsPrayed by iso", () => {
    const local: Profile = { nationsPrayed: [{ iso: "KE", date: "2024-01-01" }] };
    const cloud: Partial<Profile> = { nationsPrayed: [{ iso: "NG", date: "2024-01-02" }] };
    const merged = mergeProfiles(local, cloud);
    expect((merged.nationsPrayed ?? []).map((n) => n.iso).sort()).toEqual(["KE", "NG"]);
  });

  it("keeps id-keyed collections (prayingFor) unioned, local overriding", () => {
    const local: Profile = { prayingFor: [{ id: "a", name: "Ada", addedAt: "1", prayedAt: [] }] };
    const cloud: Partial<Profile> = {
      prayingFor: [
        { id: "a", name: "OLD", addedAt: "0", prayedAt: [] },
        { id: "b", name: "Ben", addedAt: "2", prayedAt: [] },
      ],
    };
    const merged = mergeProfiles(local, cloud);
    expect((merged.prayingFor ?? []).length).toBe(2);
    expect(merged.prayingFor?.find((p) => p.id === "a")?.name).toBe("Ada");
  });

  it("scalar keys: local wins, cloud fills gaps", () => {
    const merged = mergeProfiles({ name: "Local" }, { name: "Cloud", stage: "growing" });
    expect(merged.name).toBe("Local");
    expect(merged.stage).toBe("growing");
  });
});
