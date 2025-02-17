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

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <h2 className='mt-32 text-center opacity-50 sm:mt-0 sm:pt-32'>
          No posts to show!
        </h2>
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
