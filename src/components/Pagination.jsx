import ReactPaginate from "react-paginate";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useEffect, useState } from "react";

export default function Pagination({onPageChange,totalCount}) {
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    onPageChange(currentPage+1);
  }, [currentPage]);

  return (
    <div className="Pagination flex items-center justify-center my-8">
      <ReactPaginate
        className="space-x-0 flex items-center"
        containerClassName={"pagination"}
        activeClassName={"active"}
        pageClassName={"page-item"}
        onPageChange={(event) => setCurrentPage(event.selected)}
        breakLabel="..."
        pageCount={totalCount}
        previousLabel={
          <IconContext.Provider value={{ color: "#B8C1CC", size: "24px" }}>
            <AiFillLeftCircle className="hover-icon" />
          </IconContext.Provider>
        }
        nextLabel={
          <IconContext.Provider value={{ color: "#B8C1CC", size: "24px" }}>
            <AiFillRightCircle className="hover-icon" />
          </IconContext.Provider>
        }
      />
    </div>
  );
}
