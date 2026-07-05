import { describe, it, expect } from "vitest";
import { placeFromText } from "@/lib/places";

describe("places.placeFromText", () => {
  it("pins 'South Sudan' to Juba, not Khartoum (longest-match wins)", () => {
    // Regression: "sudan" is a substring of "south sudan"; a first-match in
    // array order mis-pinned South Sudan news onto Khartoum.
    const p = placeFromText("Floods displace thousands across South Sudan");
    expect(p?.name).toBe("Juba");
  });

  it("still pins plain 'Sudan' to Khartoum", () => {
    const p = placeFromText("Aid convoys reach Sudan's capital");
    expect(p?.name).toBe("Khartoum");
  });

  it("returns null when no place keyword is present", () => {
    expect(placeFromText("A quiet day with no location at all")).toBeNull();
  });
});
