"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth";
import {
  PROFILE_CHANGE_EVENT,
  loadProfile,
  saveProfile,
  type Profile,
} from "@/lib/profile";
import { mergeProfiles, pullCloudProfile, schedulePush } from "@/lib/cloud-sync";

/**
 * Invisible bridge mounted at the root.
 * - On sign-in: pulls the user's cloud profile, merges with local, saves locally.
 * - On any local profile change while signed in: debounced push to cloud.
 * - When signed out / not configured: does nothing.
 */
export function ProfileSyncBridge() {
  const { user, configured, ready } = useAuth();
  const lastUserId = useRef<string | null>(null);

  // Pull on sign-in
  useEffect(() => {
    if (!configured || !ready) return;
    if (!user) {
      lastUserId.current = null;
      return;
    }
    if (lastUserId.current === user.id) return;
    lastUserId.current = user.id;

    (async () => {
      try {
        const cloud = await pullCloudProfile();
        if (!cloud) {
          // No cloud row yet — push current local profile to seed it
          const local = loadProfile();
          schedulePush(local, 100);
          return;
        }
        const local = loadProfile();
        const merged = mergeProfiles(local, cloud.profile);
        saveProfile(merged);
      } catch {
        // ignore — surfaced on /account
      }
    })();
  }, [configured, ready, user]);

  // Push on local changes
  useEffect(() => {
    if (!configured || !user) return;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<Profile>).detail;
      if (detail) schedulePush(detail);
    };
    window.addEventListener(PROFILE_CHANGE_EVENT, handler);
    return () => window.removeEventListener(PROFILE_CHANGE_EVENT, handler);
  }, [configured, user]);

  return null;
}
