'use client';
import { Button, ButtonGroup, Pagination } from '@nextui-org/react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import React from 'react'

export default function SortingPanel() {

  const [prevSort, setPrevSort] = React.useState('');
  const [sortBy, setSortBy] = React.useState('title');
  const [isAsc, setIsAsc] = React.useState(true);
  const currentPath = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();


  React.useEffect(() => {
    //console.log('currentPath: ',currentPath);

    //const params = Object.fromEntries(searchParams.entries());
    // console.log('params:',JSON.stringify(params));
    // console.log('searchParams:',searchParams);

    const params = new URLSearchParams(searchParams.toString());
    if (searchParams.has('sort'))
      params.set('sort', sortBy);
    else {
      params.append('sort', sortBy);
    }
    const order = isAsc? 'asc': 'des';

    if (searchParams.has('order'))
      params.set('order', order);
    else {
      params.append('order', order);
    }



    const catalog = ['/search', '/book', '/genre']
    if (catalog.includes(currentPath)) {
      //  console.log('catalog page',currentPage);
      router.push(`${currentPath}?${params.toString()}`);
      
    }
    // console.log(`${currentPath}?${params.toString()}`);

  }, [sortBy,isAsc, currentPath]);


  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name;

    if (prevSort == name) {
      setIsAsc(!isAsc);
    } 
    else {
      setPrevSort(name);
      setIsAsc(true);
    }
    setSortBy(name);
  };

  return (
    <div className=''>
      <ButtonGroup className="flex justify-end m-6">
        <Button name='title'color={`${sortBy==='title' && isAsc? 'primary' : 'default' }`} value={1} onClick={(e) => handleButtonClick(e)}>
          Title
        </Button>
        <Button name='author' color={`${sortBy==='author' && isAsc? 'primary' : 'default' }`} onClick={(e) => handleButtonClick(e)}>
          Author
        </Button>
        <Button name='rating' color={`${sortBy==='rating' && isAsc? 'primary' : 'default' }`} onClick={(e) => handleButtonClick(e)}>
          Rating
        </Button>
      </ButtonGroup>
    </div>
  )
}
