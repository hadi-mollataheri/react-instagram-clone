/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useUserStoreSelectors } from '../../stores/user-store';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  Input,
  Image,
  Center,
  Flex,
} from '@chakra-ui/react';

const CreatePostModal = ({ isOpen, onClose }) => {
  const [emptyNessCheck, setEmptyNessCheck] = useState(null);

  const postText = useUserStoreSelectors.use.postText();
  const updatePostText = useUserStoreSelectors.use.updatePostText();
  const postImages = useUserStoreSelectors.use.postImages();
  const updatePostImages = useUserStoreSelectors.use.updatePostImages();

  const handlePostTextChange = ({ target }) => {
    updatePostText(target.value); // update the postText state with the new value from the input field
  };
  // It allows users that preview their selected files and also updating the postImages state
  const handleImageChange = (event) => {
    const files = event.target.files; //contains the FileList object including the selected files by the user
    // Turn the files object into an array of urls so we can show a preview of selected files to users and also update the postImages state
    const imageUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file),
    );
    updatePostImages(imageUrls); // update the postImages state with the new image urls
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Check if both postText and postImages are not empty before submitting the form
    if (postText.trim().length <= 0 || postImages.length <= 0) {
      setEmptyNessCheck(true);
      return;
    } else {
      //TODO:Update Your Home Component AND Placeholder for post submission logic
      console.log('Post Text:', postText);
      console.log('Selected Images:', postImages);
      // Clear the fields
      updatePostText('');
      updatePostImages([]);
      setEmptyNessCheck(false);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='lg'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a New Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Text input for post content */}
          <Textarea
            placeholder='Write something interesting...'
            value={postText}
            onChange={handlePostTextChange}
            mb={4}
          />

          {/* File input for image selection */}

          <Input
            type='file'
            accept='image/*'
            multiple
            pt='5px'
            onChange={handleImageChange}
          />

          {/* Preview of selected images */}
          {postImages.length > 0 && (
            <div className='mt-4 flex flex-wrap'>
              {postImages.map((src, index) => (
                <img
                  className='m-2 h-24 w-24 rounded object-cover'
                  key={index}
                  src={src}
                  alt={`Selected ${index}`}
                />
              ))}
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          {emptyNessCheck === true && (
            <p className='text-sm text-red-300'>
              <span className='text-2xl text-red-600'>*</span>Please fill out
              the post text and select at least one image before posting!
            </p>
          )}
          <Button variant='outline' mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme='teal'
            onClick={handleSubmit}
            bgColor='pink.400'
            _hover={{ background: '#DB2796' }}
          >
            Post
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreatePostModal;
