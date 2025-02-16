/* eslint-disable react/prop-types */
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
} from '@chakra-ui/react';

const CreatePostModal = ({ isOpen, onClose }) => {
  const postText = useUserStoreSelectors.use.postText();
  const updatePostText = useUserStoreSelectors.use.updatePostText();
  const postImages = useUserStoreSelectors.use.postImages();
  const updatePostImages = useUserStoreSelectors.use.updatePostImages();

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
    //TODO:Update Your Home Component AND Placeholder for post submission logic
    console.log('Post Text:', postText);
    console.log('Selected Images:', postImages);
    // Clear the fields
    updatePostText('');
    updatePostImages([]);
    onClose();
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
            onChange={(e) => updatePostText(e.target.value)}
            mb={4}
          />
          {/* File input for image selection */}
          <Input
            type='file'
            accept='image/*'
            multiple
            onChange={handleImageChange}
          />
          {/* Preview of selected images */}
          {postImages.length > 0 && (
            <div className='mt-4'>
              {postImages.map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`Selected ${index}`}
                  boxSize='100px'
                  objectFit='cover'
                  mr={2}
                  mb={2}
                />
              ))}
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant='outline' mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='teal' onClick={handleSubmit}>
            Post
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreatePostModal;
