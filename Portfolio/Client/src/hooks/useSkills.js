import { useState, useEffect, useCallback } from "react";
import { skillsApi } from "../api/skillsApi";

export function useSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSkills = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await skillsApi.getSkills();
      if (response.success) {
        setSkills(response.data.skills || []);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch skills");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return { skills, loading, error, refetch: fetchSkills };
}
