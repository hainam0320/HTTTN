import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a >Copy right</a>
        <span className="ms-1">&copy;2024 by NamAnh</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Develop by</span>
        <a >
          Nam & Anh
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
