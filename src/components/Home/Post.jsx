/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Heart, ChatCircle } from '@phosphor-icons/react';
import { getUser, supabase } from '../../utilities/supabase-apiCalls';

function Post({ post }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCounter, setLikeCounter] = useState(0);
  const [currentUsername, setCurrentUsername] = useState('');

  useEffect(() => {
    const getCurrentUsername = async () => {
      const user = await getUser();

      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', user.id);
        setCurrentUsername(data[0].username);
      }
    };
    getCurrentUsername();
  }, []);

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
    <div className='post-container mx-auto mb-16 mt-12 flex max-w-96 flex-col'>
      <div className='images-container relative flex items-center justify-center'>
        <img
          src={post.images[imageIndex]}
          alt={post.content}
          className='mx-2 h-48 w-[90%] rounded object-cover'
        />
        {post.images.length >= 2 && (
          <>
            <button
              className='backward-button absolute left-5 top-1/2 h-8 w-8 -translate-y-1/2 transform rounded-full bg-slate-900 pb-1 text-xl font-bold leading-none opacity-70 hover:opacity-100 active:bg-slate-700 active:delay-[60ms]'
              onClick={handleBackward}
            >
              &#8592;
            </button>
            <button
              className='forward-button absolute right-5 top-1/2 h-8 w-8 -translate-y-1/2 transform rounded-full bg-slate-900 pb-1 text-xl font-bold leading-none opacity-70 hover:opacity-100 active:bg-slate-700 active:delay-[60ms]'
              onClick={handleForward}
            >
              &#8594;
            </button>
          </>
        )}
      </div>
      <div className='post-details pl-[5%] pr-[5%] leading-7'>
        <button onClick={handleLikeButton} className='like-button mt-2'>
          {/* Create buttons and detail below the image */}

          <Heart
            size={24}
            weight='fill'
            color={`${isLiked ? '#c20000' : '#ffffff'}`}
          />
        </button>
        <button className='chat-button pl-3'>
          <ChatCircle size={24} />
        </button>
        {likeCounter ? (
          <p className='like-counter text-sm'>
            {likeCounter} like<small>(s)</small>
          </p>
        ) : null}

        <p className='pt-2'>
          <span className='pr-1 font-bold'>{currentUsername}</span>
          {post.content}
        </p>
        <button className='opacity-60'>View all [*] comments</button>
        <div className='quick-post flex justify-between pb-1'>
          <input
            placeholder='Add a comment ...'
            className='w-full bg-transparent outline-none placeholder:opacity-50'
            type='text'
          ></input>
          <button className='ml-3 opacity-80 active:opacity-100'>Post</button>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default Post;
