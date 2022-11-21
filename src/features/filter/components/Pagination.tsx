import { BackwardIcon, ForwardIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';

export const Pagination = ({ totalPages }: { totalPages: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState(pageParam ? +pageParam : 1);
  const handlePageClick = ({ selected }: { selected: number }) => {
    searchParams.set('page', (selected + 1).toString());
    setSearchParams(searchParams);
    setCurrentPage(selected + 1);
  };
  useEffect(() => {
    debugger;
    if (searchParams.get('page') === null) {
      setCurrentPage(1);
    }
  }, [searchParams]);

  return (
    <ReactPaginate
      className=""
      containerClassName="btn-group"
      previousLinkClassName="btn rounded-r-none border-0 bg-base-300 text-base-content hover:bg-base-content/10"
      nextLinkClassName="btn rounded-l-none border-0 bg-base-300 text-base-content hover:bg-base-content/10"
      activeLinkClassName="btn-active bg-primary"
      pageLinkClassName="btn rounded-none border-0 bg-base-300 text-base-content hover:bg-base-content/10"
      breakLinkClassName="btn rounded-none border-0 bg-base-300 text-base-content hover:bg-base-content/10"
      disabledLinkClassName="btn-disabled text-base-content/30"
      breakLabel="..."
      nextLabel={<ForwardIcon className={clsx('w-3 h-3')} />}
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={totalPages}
      previousLabel={<BackwardIcon className={clsx('w-3 h-3')} />}
      renderOnZeroPageCount={() => null}
      forcePage={currentPage - 1}
    />
  );
};
