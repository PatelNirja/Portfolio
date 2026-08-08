import { useState, useEffect, useCallback } from "react";
import { projectsApi } from "../api/projectsApi";

export function useProjects(initialParams = {}) {
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await projectsApi.getProjects(params);
      if (response.success) {
        setProjects(response.data.projects || []);
        setPagination(response.pagination || null);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects(initialParams);
  }, [fetchProjects]);

  return { projects, pagination, loading, error, refetch: fetchProjects };
}
