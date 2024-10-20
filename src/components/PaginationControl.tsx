'use client';
import { Pagination } from '@nextui-org/react'
import { useSearchParams,useRouter,usePathname } from 'next/navigation';
import React from 'react'

export default function PaginationControl() {

  const [currentPage, setCurrentPage] = React.useState(1);
  const currentPath = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  
  React.useEffect(() => {
    //console.log('currentPath: ',currentPath);

    //const params = Object.fromEntries(searchParams.entries());
    // console.log('params:',JSON.stringify(params));
    // console.log('searchParams:',searchParams);

    const params = new URLSearchParams(searchParams.toString());
    if(searchParams.has('page'))
      params.set('page', currentPage.toString());
    else{
      params.append('page', currentPage.toString());
    }
 
      
    
    const catalog = ['/search','/book','/genre']
    if(catalog.includes(currentPath)){
      //  console.log('catalog page',currentPage);
      // console.log(`${currentPath}?${params.toString()}`);
      router.push(`${currentPath}?${params.toString()}`);
      
    }

  }, [currentPage, currentPath]);


  return (
    <div className=''>
      <div className="flex justify-center m-8">
        <Pagination
          total={10}
          siblings={2}
          showControls
          boundaries={2}
          page={currentPage}
          onChange={setCurrentPage}
          color="primary"
        />
      </div>
    </div>
  )
}
