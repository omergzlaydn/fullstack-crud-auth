import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ total }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageClick = (event) => {
    searchParams.set("page", event.selected + 1);
    setSearchParams(searchParams);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 20,
        boxSizing: "border-box",
        width: "100%",
        height: "100%",
      }}
    >
      <ReactPaginate
        activeClassName={"item active "}
        breakClassName={"item break-me "}
        breakLabel={"..."}
        containerClassName={"pagination"}
        disabledClassName={"disabled-page"}
        pageClassName={"item pagination-page "}
        marginPagesDisplayed={2}
        nextClassName={"item next "}
        previousClassName={"item previous"}
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={total}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
