import { useSearchParams } from "react-router-dom";

export default function Pagination({ pagination }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    current_page,
    total_pages,
  } = pagination;

  const goToPage = (page) => {
    const params = Object.fromEntries(searchParams.entries());

    setSearchParams({
      ...params,
      page,
    });
  };

  if (total_pages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <button
        disabled={current_page === 1}
        onClick={() => goToPage(current_page - 1)} >
        Previous </button>

      <span>
        {" "}
        Page {current_page} of {total_pages}{" "}
      </span>

      <button
        disabled={current_page === total_pages}
        onClick={() => goToPage(current_page + 1)} > Next
      </button>
    </div>
  );
}