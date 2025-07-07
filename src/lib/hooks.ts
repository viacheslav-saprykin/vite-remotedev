import { useContext, useEffect, useState } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";
import { useQueries, useQuery } from "@tanstack/react-query";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";
import { ActiveIdContext } from "../contexts/ActiveIdContextProvider";
import { SearchTextContext } from "../contexts/SearchTextContextProvider";
import { JobItemsContext } from "../contexts/JobItemsContextProvider";
import { handleError } from "./utils";

// ---------- API types ----------
type JobItemApiResponse = {
  public: boolean;
  jobItem: JobItemExpanded;
};

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

// ---------- Fetchers ----------
const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
  console.log("fetchJobItem id:", id);
  const response = await fetch(`${BASE_API_URL}/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description || "Failed to fetch job item");
  }
  return await response.json();
};

const fetchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
  const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description || "Failed to fetch job items");
  }
  return await response.json();
};

// ---------- Hooks ----------
export function useJobItem(id: number | null) {
  const queryEnabled = typeof id === "number" && Number.isFinite(id) && id > 0;

  const { data, isPending, error } = useQuery<JobItemApiResponse>({
    queryKey: ["job-item", id],
    queryFn: () => {
      if (!id) throw new Error("Missing job ID");
      return fetchJobItem(id);
    },
    enabled: queryEnabled,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    if (error) handleError(error);
  }, [error]);

  // Ось тут:
  return {
    jobItem: data?.jobItem,
    isLoading: queryEnabled ? isPending : false,
  } as const;
}

export function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
    })),
  });

  const jobItems = results
    .map((result) => result.data?.jobItem)
    .filter(Boolean) as JobItemExpanded[];

  const isLoading = results.some((result) => result.isPending);

  return { jobItems, isLoading };
}

export function useSearchQuery(searchText: string) {
  const enabled = Boolean(searchText);

  const { data, isPending, error } = useQuery<JobItemsApiResponse>({
    queryKey: ["job-items", searchText],
    queryFn: () => fetchJobItems(searchText),
    enabled,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
  });

  // Додаємо показ помилки
  useEffect(() => {
    if (error) handleError(error);
  }, [error]);

  return {
    jobItems: data?.jobItems,
    isLoading: isPending,
  } as const;
}

// ---------- Utilities ----------
export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const idStr = window.location.hash.replace(/^#\/?/, "");
      const id = idStr && !isNaN(+idStr) ? +idStr : null;
      setActiveId(id);
    };

    handleHashChange(); // одразу при старті
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  console.log("activeId при старті:", activeId);
  return activeId;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}

export function useOnClickOutside(
  refs: React.RefObject<HTMLElement>[],
  handler: () => void
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (refs.every((ref) => !ref.current?.contains(e.target as Node))) {
        handler();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [refs, handler]);
}

// ---------- Context Shortcuts ----------
export function useBookmarksContext() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error(
      "useBookmarksContext must be used within a BookmarksContextProvider"
    );
  }
  return context;
}

export function useActiveIdContext() {
  const context = useContext(ActiveIdContext);
  if (!context) {
    throw new Error(
      "useActiveIdContext must be used within an ActiveIdContextProvider"
    );
  }
  return context;
}

export function useSearchTextContext() {
  const context = useContext(SearchTextContext);
  if (!context) {
    throw new Error(
      "useSearchTextContext must be used within a SearchTextContextProvider"
    );
  }
  return context;
}

export function useJobItemsContext() {
  const context = useContext(JobItemsContext);
  if (!context) {
    throw new Error(
      "useJobItemsContext must be used within a JobItemsContextProvider"
    );
  }
  return context;
}
