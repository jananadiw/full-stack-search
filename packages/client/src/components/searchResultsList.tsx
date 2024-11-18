import React from 'react';

type RenderItemResult = {
  key: string;
  text: string;
  onClick: () => void;
};

type SearchResultsListProps<T> = {
  title: string;
  items: T[];
  renderItem: (item: T) => RenderItemResult;
};

function SearchResultsList<T>({ title, items, renderItem }: SearchResultsListProps<T>) {
  return (
    <>
      <h2>{title}</h2>
      {items.length ? (
        items.map((item) => {
          const { key, text, onClick } = renderItem(item);
          return (
            <li key={key}>
              <a onClick={onClick} className="dropdown-item">
                <i className="fa fa-building mr-2"></i>
                {text}
              </a>
              <hr className="divider" />
            </li>
          );
        })
      ) : (
        <p>No {title.toLowerCase()} matched</p>
      )}
    </>
  );
}

export default SearchResultsList;
