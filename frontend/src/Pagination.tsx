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
        context.onPageChange(page - 1)
    }

    const handleAddPageNumber = () => {
        context.onPageChange(page + 1)
    }

    return (
        <>
        {page > 1 && <button onClick={handleDeductPageNumber}>← Previous</button>}
        {(page * limit) < total && <button onClick={handleAddPageNumber}>Next →</button>}
        </>
    )
} 

export default Pagination