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
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
// import { ChevronDownIcon } from '@chakra-ui/icons';

const Home = () => {
  return (
    <div>
      {/* Navigation menu for mobile screens */}
      <nav className='flex items-center justify-between px-5'>
        <div id='logo-container'>
          <img src={PICTURES.logoColor} alt='instagram' className='w-32' />
        </div>
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
            <MenuItem value='create'>
              <PlusSquare size={24} className='mr-1.5' />
              Create
            </MenuItem>
            <MenuItem value='profile' paddingLeft='2'>
              <UserCircle size={28} weight='fill' className='mr-1.5' /> Profile
            </MenuItem>
            <MenuItem>
              <SignOut size={24} className='mr-1.5' />
              LogOut
            </MenuItem>
          </MenuList>
        </Menu>
      </nav>
      <main>
        <h2 className='mt-32 text-center opacity-50'>No posts to show!</h2>
      </main>
    </div>
  );
};

export default Home;
