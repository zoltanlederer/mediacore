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
                {(page * limit) < total && <button className="primary" onClick={handleAddPageNumber}>Next →</button>}
            </div>
        </div>
    )
} 

export default Pagination