import { useEffect, useRef, useState } from 'react';
import { useUserStoreSelectors } from '../stores/user-store';
import PICTURES from '../assets/pictures';
import {
  UserCircle,
  List,
  SignOut,
  Heart,
  PlusSquare,
  MagnifyingGlass,
  HouseLine,
} from '@phosphor-icons/react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import CreatePostModal from '../components/chakra-ui/CreatePostModal';
import {
  handleGettingPosts,
  getUser,
  supabase,
} from '../utilities/supabase-apiCalls';

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const userPosts = useUserStoreSelectors.use.userPosts();
  const updateUserPosts = useUserStoreSelectors.use.updateUserPosts();

  // Create a ref to always have the latest userPosts value.
  const postsRef = useRef(userPosts);

  useEffect(() => {
    postsRef.current = userPosts;
  }, [userPosts]);

  useEffect(() => {
    const getUserPosts = async () => {
      setIsLoading(true);

      const user = await getUser();
      const userPostsDataJSON = await handleGettingPosts(user);

      // Assume that each post's images field is already an array of public URL strings.
      // If stored as a JSON string in the database, parse it once; otherwise, use it directly.
      const parsedPosts = userPostsDataJSON.map((post) => ({
        ...post,
        images:
          typeof post.images === 'string'
            ? JSON.parse(post.images)
            : post.images,
      }));

      // No need to create Blob URLs since images are now public URLs.
      updateUserPosts(parsedPosts);
      setIsLoading(false);
    };
    getUserPosts();

    // Subscribe to new post INSERT events as before (and update accordingly if needed)
    const channel = supabase
      .channel('posts_updates')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'posts' },
        (payload) => {
          console.log('New post inserted:', payload.new);
          // Assuming the new post already contains an array of image URLs.
          const newPost = payload.new;
          const currentPosts = postsRef.current;
          updateUserPosts([newPost, ...currentPosts]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [updateUserPosts, setIsLoading]);

  return (
    <div className='mt-5 sm:grid sm:grid-cols-3 sm:grid-rows-1'>
      <nav className='sm flex items-center justify-between px-5 sm:h-lvh sm:w-52 sm:flex-col sm:items-start sm:justify-start sm:border-r-2 sm:border-r-gray-500'>
        <div id='logo-container'>
          <img src={PICTURES.logoColor} alt='instagram' className='w-32' />
        </div>
        <div id='mobile-menu' className='sm:hidden'>
          <Menu>
            <MenuButton as={Button} size='sm'>
              <List size={22} />
            </MenuButton>
            <MenuList>
              <MenuItem value='home'>
                <HouseLine size={24} weight='fill' className='mr-1.5' />
                Home
              </MenuItem>
              <MenuItem value='search'>
                <MagnifyingGlass size={24} className='mr-1.5' />
                Search
              </MenuItem>
              <MenuItem value='notification'>
                <Heart size={24} className='mr-1.5' />
                Notification
              </MenuItem>
              <MenuItem value='create' onClick={onOpen}>
                <PlusSquare size={24} className='mr-1.5' />
                Create
              </MenuItem>
              <MenuItem value='profile' paddingLeft='2'>
                <UserCircle size={28} weight='fill' className='mr-1.5' />{' '}
                Profile
              </MenuItem>
              <MenuItem>
                <SignOut size={24} className='mr-1.5' />
                LogOut
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
        <div
          id='screen-menu'
          className='hidden sm:flex sm:h-screen sm:flex-col sm:justify-between sm:py-10'
        >
          <ul className='leading-[60px]'>
            <li>
              <a href='#'>
                <HouseLine
                  size={32}
                  weight='fill'
                  className='mr-4 inline-block'
                />
                Home
              </a>
            </li>
            <li>
              <a href='#'>
                <MagnifyingGlass size={32} className='mr-4 inline-block' />
                Search
              </a>
            </li>
            <li>
              <a href='#'>
                <Heart size={32} className='mr-4 inline-block' />
                Notification
              </a>
            </li>
            <li>
              <button onClick={onOpen}>
                <PlusSquare size={32} className='mr-4 inline-block' />
                Create
              </button>
            </li>
            <li>
              <a href='#'>
                <UserCircle
                  size={32}
                  weight='fill'
                  className='mr-4 inline-block'
                />
                Profile
              </a>
            </li>
          </ul>

          <button href='#'>
            <SignOut size={32} className='mr-4 inline-block' />
            LogOut
          </button>
        </div>
      </nav>

      <main className=''>
        {isLoading ? (
          <img src={PICTURES.loading} alt='loading' />
        ) : userPosts && userPosts.length > 0 ? (
          userPosts.map((post, index) => (
            <div className='post-container m-14 border' key={index + 1}>
              <div className='images-container flex-warp flex'>
                {post.images.map((image, index) => (
                  <img
                    key={`${post.id}-${index}`}
                    src={image || PICTURES.loading}
                    alt={post.content}
                    className='m-2 rounded object-cover'
                  />
                ))}
              </div>
              <div className='content-container'>
                <p>{post.content}</p>
              </div>
            </div>
          ))
        ) : (
          <h2 className='mt-32 text-center opacity-50 sm:mt-0 sm:pt-32'>
            No posts to show!
          </h2>
        )}
      </main>

      <section
        id='suggestions'
        className='mr-20 mt-[29.5px] hidden justify-self-end px-5 sm:block'
      >
        Suggestions
      </section>

      <CreatePostModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default Home;
