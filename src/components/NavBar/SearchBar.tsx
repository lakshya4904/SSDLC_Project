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
      //const query = searchValue.trim() ? { title: searchValue.trim() } : {};
      const searchTerms = ['title', 'author', 'genres', 'rating'];
      const firstWord = searchValue.trim().split(' ')[0];
      const query = searchTerms.includes(firstWord) ? searchValue.trim() : `title = ${searchValue.trim()}`;
      console.log(`/search?${encodeURIComponent(query)}`);
      router.push(`/search?${encodeURIComponent(query)}`);
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