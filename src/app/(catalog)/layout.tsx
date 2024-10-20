import PaginationControl from '@/components/PaginationControl'
import SortingPanel from '@/components/SortingPanel'
import React from 'react'

export default function CatalogLoyout({
  children,
} : {
  children:React.ReactNode
}) {
  return (
    <div>
      <h1>Catalog</h1>
      <SortingPanel/>
      {children}
      <PaginationControl/>

    </div>
  )
}
