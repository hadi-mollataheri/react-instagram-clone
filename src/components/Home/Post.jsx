/* eslint-disable react/prop-types */
import { useState } from 'react';

function Post({ post }) {
  const [imageIndex, setImageIndex] = useState(0);

  const handleForward = () => {
    setImageIndex((prevIndex) =>
      prevIndex === post.images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleBackward = () => {
    setImageIndex((prevIndex) =>
      prevIndex === 0 ? post.images.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className='post-container m-14 border'>
      <div className='images-container flex'>
        <button className='backward-button' onClick={handleBackward}>
          &#8592;
        </button>
        <img
          src={post.images[imageIndex]}
          alt={post.content}
          className='m-2 rounded object-cover'
        />
        <button className='forward-button' onClick={handleForward}>
          &#8594;
        </button>
      </div>
      <div className='content-container'>
        <p>{post.content}</p>
      </div>
    </div>
  );
}

export default Post;
