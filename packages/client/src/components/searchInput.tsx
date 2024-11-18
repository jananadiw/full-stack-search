import React from 'react';

type SearchInputProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showClearBtn: boolean;
  handleClear: () => void;
}
const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  setSearchTerm,
  showClearBtn,
  handleClear
}) => {
  return (
    <div className='form'>
      <i className='fa fa-search'></i>
      <input
        type="text"
        className='form-control form-input'
        placeholder='Search accommodation...'
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        />
      {showClearBtn && (
        <span className='left-pan' onClick={handleClear}>
          <i className='fa fa-close'></i>
        </span>
      )}
    </div>
  )
}

export default SearchInput;
