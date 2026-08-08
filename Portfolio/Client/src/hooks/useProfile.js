import { useState, useEffect, useCallback } from "react";
import { profileApi } from "../api/profileApi";

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await profileApi.getProfile();
      if (response.success) {
        setProfile(response.data.profile);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, error, refetch: fetchProfile };
}
