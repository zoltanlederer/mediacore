import { useContext } from 'react'
import MediaContext from './MediaContext'

function Pagination () {
    const context = useContext(MediaContext)
    if (!context) {
        return null
    }

    const page = context.page
    const total = context.total
    const limit = context.limit

    const totalPages = Math.ceil(total / limit)
    const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max)

    // shows a window of up to 5 page numbers centered on the current page,
    // shrinking near the start/end rather than always forcing exactly 5
    const startPage = clamp(page - 2 , 1, totalPages)
    const endPage = clamp(page + 2 , 1, totalPages)
    const pageNumbers = Array.from(
        {length: endPage - startPage + 1},
        (_, i) => startPage + i
    )

    const handleDeductPageNumber = () => {
        // page - 1, not page--, since page-- returns the OLD value before decrementing
        context.onPageChange(page - 1)
    }

    const handleAddPageNumber = () => {
        context.onPageChange(page + 1)
    }

    return (
        <div className="pagination">
            <span className="pagination-status">
                Showing {(page - 1) * limit + 1}-{Math.min(page * limit, total)} of {total}
            </span>
            
            <div className="pagination-buttons">
                {page > 1 && <button onClick={handleDeductPageNumber}>← Previous</button>}
                {pageNumbers.map(num => (
                    <button
                        key={num}
                        className={num === page ? 'primary' : ''}
                        onClick={() => context.onPageChange(num)}
                    >
                    {num}
                    </button>
                ))}
                {(page * limit) < total && <button onClick={handleAddPageNumber}>Next →</button>}
            </div>
        </div>
    )
} 

export default Pagination