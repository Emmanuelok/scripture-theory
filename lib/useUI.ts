"use client";

import { useProfile } from "@/lib/profile";
import { uiFor, RTL_LOCALES } from "@/data/ui-i18n";
import type { LocaleCode } from "@/data/gospel-i18n";

/**
 * Hook returning translated UI strings and locale metadata.
 * Falls back to English when the profile hasn't picked a language.
 */
export function useUI() {
  const { profile, mounted } = useProfile();
  const locale = (profile.locale ?? "en") as LocaleCode;
  const t = uiFor(locale);
  const dir: "ltr" | "rtl" = RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
  return { t, locale, dir, mounted };
}
