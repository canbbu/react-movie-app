import React from 'react';

const List = ({ type }) => {
  return (
    <div>
      <h1>{type === 'my' ? 'My List' : 'Watch List'}</h1>
      {/* Render items based on the type */}
      {type === 'my' ? (
        <div>
          {/* Render your My List items here */}
          <p>My List items go here.</p>
        </div>
      ) : (
        <div>
          {/* Render your Watch List items here */}
          <p>Watch List items go here.</p>
        </div>
      )}
    </div>
  );
};

export default List;
