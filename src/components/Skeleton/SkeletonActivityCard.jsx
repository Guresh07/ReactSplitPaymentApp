import React from 'react'

const SkeletonActivityCard = () => {
    return (
        <>
            <div className="activityDetails shadow-sm d-flex flex-column row-gap-1 px-3 mb-2 py-3 bg-white rounded placeholder-glow">
                <div className="placeholder col-7 rounded"></div>
                <div className="placeholder col-4 rounded"></div>
            </div>
        </>
    )
}

export default SkeletonActivityCard