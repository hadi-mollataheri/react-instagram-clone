/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Heart } from '@phosphor-icons/react';

function Post({ post }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCounter, setLikeCounter] = useState(0);

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

  const handleLikeButton = () => {
    const newIsLiked = !isLiked; // Determine the new like state from the current state
    setIsLiked(newIsLiked);
    setLikeCounter((prevCounter) =>
      newIsLiked ? prevCounter + 1 : Math.max(prevCounter - 1, 0),
    );
  };

  return (
    <div className='post-container mx-auto my-12 flex max-w-96 flex-col'>
      <div className='images-container relative flex items-center justify-center'>
        <img
          src={post.images[imageIndex]}
          alt={post.content}
          className='mx-2 h-48 w-[90%] rounded object-cover'
        />
        {post.images.length >= 2 && (
          <>
            <button
              className='backward-button absolute left-5 top-1/2 h-8 w-8 -translate-y-1/2 transform rounded-full bg-slate-800 pb-1 text-lg font-bold leading-none opacity-50 hover:opacity-100 active:bg-slate-700 active:delay-[60ms]'
              onClick={handleBackward}
            >
              &#8592;
            </button>
            <button
              className='forward-button absolute right-5 top-1/2 h-8 w-8 -translate-y-1/2 transform rounded-full bg-slate-800 pb-1 text-lg font-bold leading-none opacity-50 hover:opacity-100 active:bg-slate-700 active:delay-[60ms]'
              onClick={handleForward}
            >
              &#8594;
            </button>
          </>
        )}
      </div>
      <div className='post-details pl-[5%]'>
        <button onClick={handleLikeButton} className='pt-2'>
          {/* Create buttons and detail below the image */}

          <Heart
            size={28}
            weight='fill'
            color={`${isLiked ? '#c20000' : '#ffffff'}`}
          />
        </button>
        {likeCounter ? (
          <p>
            {likeCounter} like<small>(s)</small>
          </p>
        ) : null}
      </div>
      <div className='content-container'>
        <p className='pl-[5%] pt-4 text-sm'>{post.content}</p>
      </div>
    </div>
  );
}

export default Post;
