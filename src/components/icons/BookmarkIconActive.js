import React from 'react';

const BookmarkIconActive = ({ onClick }) => {
  return (
    <svg onClick={onClick} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 4C5 3.44771 5.44772 3 6 3H18C18.5523 3 19 3.44772 19 4V22L12 16.5L5 22V4Z" fill="#2F71E5"/>
    </svg>
  )
}

export default BookmarkIconActive