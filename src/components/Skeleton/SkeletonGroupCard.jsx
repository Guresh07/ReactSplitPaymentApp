import React from 'react'

const SkeletonGroupCard = () => {
  return (
    <>
                <div className="col-sm-12 col-lg-6 pb-2 d-flex justify-content-center align-items-center">
                <div className="groupCard shadow-sm px-3 py-2 rounded bg-white col-11 d-flex justify-content-between align-items-center placeholder-glow">
                    <div className="groupDetails d-flex flex-column gap-1">
                        <div className="placeholder col-6 rounded"></div>
                        <div className="placeholder col-4 rounded"></div>
                        <div className="placeholder col-5 rounded"></div>
                        <div className="placeholder col-3 rounded-pill py-2"></div>
                    </div>
                    <div className="totalAmmount d-flex flex-column align-items-end gap-2">
                        <div className="placeholder col-4 rounded"></div>
                        <div className="placeholder col-3 rounded"></div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default SkeletonGroupCard