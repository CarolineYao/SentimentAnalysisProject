import React, { useEffect, useState } from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { generateRandomId } from './utils';
import '../styles/pagination.scss';

const Pagination = (props) => {
    const pageSize = 5;
    const neighbours = 2;

    const { itemLst, onPageChange } = props;
    const totalItems = itemLst.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        setCurrentPage(offset / pageSize);
    }, [offset]);

    useEffect(() => {
        handlePageChange(0);
    }, [itemLst]);

    function handlePageChange(newOffset) {
        setOffset(newOffset);
        onPageChange(itemLst.slice(newOffset, newOffset + pageSize));
    }

    function handlePageButtonClick(pageNumber) {
        handlePageChange(pageNumber * pageSize);
    }

    function handleNextPageButtonClick() {
        handlePageChange(offset + pageSize);
    }

    function handlePrevPageButtonClick() {
        handlePageChange(offset - pageSize);
    }

    const renderPageItems = () => {
        const numberOfPagesShown = Math.min(neighbours * 2 + 1, totalPages);
        const startPage = currentPage - neighbours;
        const endPage = currentPage + neighbours;

        let pageOffset = startPage;
        if (startPage < 0) {
            pageOffset = 0;
        } else if (endPage >= totalPages) {
            pageOffset += totalPages - endPage - 1;
            pageOffset = pageOffset < 0 ? 0 : pageOffset;
        }

        const pages = Array.from(Array(numberOfPagesShown).keys(), (n) => n + pageOffset);

        return pages.map((page, index) => {
            if (page >= totalPages) {
                return;
            }
            const itemId = generateRandomId('pagination_item');

            return (
                <React.Fragment>
                    {index === 0 && page > 0 && <BootstrapPagination.Ellipsis />}
                    <div className='pagination-item' id={itemId}>
                        <BootstrapPagination.Item
                            key={page}
                            active={currentPage === page}
                            onClick={() => {
                                handlePageButtonClick(page);
                            }}
                        >
                            {page + 1}
                        </BootstrapPagination.Item>
                    </div>
                    {index + 1 === pages.length && page + 1 < totalPages && (
                        <BootstrapPagination.Ellipsis />
                    )}
                </React.Fragment>
            );
        });
    };

    return (
        <div className='pagination-handler'>
            <BootstrapPagination>
                <BootstrapPagination.First
                    onClick={() => {
                        handlePageButtonClick(0);
                    }}
                />
                <BootstrapPagination.Prev
                    disabled={offset === 0}
                    onClick={handlePrevPageButtonClick}
                />
                {renderPageItems()}

                <BootstrapPagination.Next
                    disabled={offset + pageSize > totalItems}
                    onClick={handleNextPageButtonClick}
                />
                <BootstrapPagination.Last
                    onClick={() => {
                        handlePageButtonClick(totalPages - 1);
                    }}
                />
            </BootstrapPagination>
        </div>
    );
};

export default withRouter(Pagination);
