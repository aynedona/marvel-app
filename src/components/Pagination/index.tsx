import React from 'react';
import './style.scss';

const MAX_ITEMS = 5;
const CURRENT_ITEM = 1;
const MAX_LEFT = (MAX_ITEMS - CURRENT_ITEM) / 2;

interface PaginationItemProps {
  limit: number;
  total: number;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}

export function Pagination({ limit, total, offset, setOffset }: PaginationItemProps) {
  const currentPage = offset ? offset / limit + 1 : 1;
  const countPages = Math.ceil(total / limit);
  const firstPage = Math.max(currentPage - MAX_LEFT, 1);

  return (
    <div className='container flex justify-center items-center mt-4'>
      <ul className='flex'>
        {Array.from({ length: Math.min(MAX_ITEMS, countPages) })
          .map((_, index) => index + firstPage)
          .map((page) => (
            <li key={page}>
              <button
                onClick={() => setOffset((page - 1) * limit)}
                className={
                  page === currentPage ? 'current-page' : ''
                }
              >
                {page}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}