import { useEffect, useRef } from 'react';
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

  const userPosts = useUserStoreSelectors.use.userPosts();
  const updateUserPosts = useUserStoreSelectors.use.updateUserPosts();

  // Create a ref to always have the latest userPosts value.
  const postsRef = useRef(userPosts);

  useEffect(() => {
    postsRef.current = userPosts;
  }, [userPosts]);

  useEffect(() => {
    const getUserPosts = async () => {
      const user = await getUser();
      const userPostsDataJSON = await handleGettingPosts(user);

      // Parse each image JSON string to object
      const parsedPosts = userPostsDataJSON.map((post) => ({
        ...post,
        images: post.images.map((image) => JSON.parse(image)),
      }));

      // Transform the image objects to Blob URLs for rendering
      const postsWithBlobImgURLs = parsedPosts.map((post) => ({
        ...post,
        images: post.images.map((img) => URL.createObjectURL(new Blob([img]))),
      }));

      updateUserPosts(
        postsWithBlobImgURLs.length > 0 ? postsWithBlobImgURLs : null,
      );
    };
    getUserPosts();

    // Subscribe to new post INSERT events via a realtime channel.
    const channel = supabase
      .channel('posts_updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'posts',
        },
        (payload) => {
          console.log('New post inserted:', payload.new);

          // Transform the new post to match our data format.
          const transformNewPost = (post) => {
            // Step 1: Parse each image JSON string so we get a JavaScript object.
            // For each image stored in the post, do JSON.parse(image).
            const parsedImages = post.images.map((image) => JSON.parse(image));
            // Step 2: Convert each parsed image object into a Blob URL.
            // new Blob([img]) creates a Blob from the parsed image, and URL.createObjectURL creates a URL for that Blob.
            const blobImgURLs = parsedImages.map((img) =>
              URL.createObjectURL(new Blob([img])),
            );
            // Return a new post object that has all original properties,
            // but with its images property replaced by the array of Blob URLs.
            return { ...post, images: blobImgURLs };
          };

          const newPost = transformNewPost(payload.new);
          const currentPosts = postsRef.current;
          updateUserPosts([newPost, ...currentPosts]);
        },
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [updateUserPosts]);

  console.log('userPosts:', userPosts);

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
        {userPosts && userPosts.length > 0 ? (
          userPosts.map((post, index) => (
            <div className='post-container m-14 border' key={`Post ${index}`}>
              <div className='images-container flex-warp flex'>
                {post.images.map((image, imageIndex) => (
                  <img
                    key={`image ${imageIndex}`}
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
