import { useActiveIdContext, useSearchTextContext } from "../lib/hooks";
import { JobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
  jobItems: JobItem[];
  isLoading: boolean;
};

export function JobList({ jobItems, isLoading }: JobListProps) {
  const { activeId } = useActiveIdContext();
  const { debouncedSearchText } = useSearchTextContext();

  // Якщо debouncedSearchText порожній — просто порожній список
  if (!debouncedSearchText) {
    return <ul className="job-list"></ul>;
  }

  // Якщо йде завантаження — тільки спінер
  if (isLoading) {
    return (
      <ul className="job-list">
        <Spinner />
      </ul>
    );
  }

  // Якщо jobs порожній і не йде завантаження — показати повідомлення
  if (jobItems.length === 0) {
    return (
      <ul className="job-list">
        <li className="job-list__empty">No jobs found</li>
      </ul>
    );
  }

  return (
    <ul className="job-list">
      {jobItems.map((jobItem) => (
        <JobListItem
          key={jobItem.id}
          jobItem={jobItem}
          isActive={jobItem.id === activeId}
        />
      ))}
    </ul>
  );
}

export default JobList;
