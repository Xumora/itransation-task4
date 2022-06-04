import React from 'react'

const Pagination = ({ pagesCount, selectedPage, setPageFunction }) => {
    const prevPage = () => {
        if (selectedPage !== 1) {
            setPageFunction(selectedPage - 1)
        }
    }
    const nextPage = () => {
        if (pagesCount !== selectedPage) {
            setPageFunction(selectedPage + 1)
        }
    }
    return (
        <div className='d-flex align-items-center justify-content-center mt-3'>
            <ul className="pagination">
                <li className="page-item">
                    <button className="btn page-link shadow-none" onClick={prevPage} disabled={selectedPage === 1}>&laquo;</button>
                </li>
                {
                    new Array(pagesCount).fill(null).map((v, i) => {
                        return <li className={`page-item ${(selectedPage === i + 1 && 'active') || ('')}`} key={i}>
                            <button className="btn page-link shadow-none" onClick={() => setPageFunction(i + 1)}>{i + 1}</button>
                        </li>
                    })
                }
                <li className="page-item">
                    <button className="btn page-link shadow-none" onClick={nextPage} disabled={selectedPage === pagesCount}>&raquo;</button>
                </li>
            </ul>
        </div>
    )
}

export default Pagination