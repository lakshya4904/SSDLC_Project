import { Input } from '@nextui-org/react';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter,usePathname } from 'next/navigation';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if(searchValue.trim().length === 0) return ;
      //const query = searchValue.trim() ? { title: searchValue.trim() } : {};
      const searchTerms = ['title', 'author', 'genre', 'rating'];
      const firstWord = searchValue.trim().split('=')[0];
      const query = searchTerms.includes(firstWord) ? searchValue.trim() : `title=${searchValue.trim()}`;
      router.push(`/search?${query}`);
    }
  };

  return (
    <div className='w-full'>
      <Input
        className={` w-full `}
        placeholder="Type to search..."
        startContent={<FaSearch />}
        type="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleSearch}
      />
    </div>
  );
};

export default SearchBar;