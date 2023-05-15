import React, { Suspense, useEffect, useState } from 'react'

const SpaceRemaining = () => {
  const [usedSpace, setUsedSpace] = useState(null)
  const [availableSpace, setAvailableSpace] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/disk-space')
      .then(res => res.json())
      .then(diskSpace => {
        setUsedSpace(diskSpace.size - diskSpace.free)
        setAvailableSpace(diskSpace.free)
      })
      .catch(err => {
        setError(err.message)
      })
  }, [])

  const getStorageUsage = () => {
    if (error) {
      return <p>Error retrieving disk space info: {error}</p>
    } else if (usedSpace === null || availableSpace === null) {
      return <p>Loading...</p>
    } else {
      const usedSpaceInGB = (usedSpace / 1073741824).toFixed(2)
      const availableSpaceInGB = (availableSpace / 1073741824).toFixed(2)

      return (
        <>
          {/* <Pie data={data} /> */}
          <p>Total storage used: {usedSpaceInGB} GB</p>
          <p>Remaining storage: {availableSpaceInGB} GB</p>
        </>
      )
    }
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div>
        <h4>Space Remaining</h4>
        {getStorageUsage()}
      </div>
    </Suspense>
  )
}

export default SpaceRemaining
