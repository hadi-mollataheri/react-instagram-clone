/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
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
  Flex,
  Text,
} from '@chakra-ui/react';
import { handleCreatePost } from '../../utilities/supabase-apiCalls';

const CreatePostModal = ({ isOpen, onClose }) => {
  const [emptyNessCheck, setEmptyNessCheck] = useState(null);
  // State that stores actual post images for uploading to supabase posts table
  const [selectedPics, setSelectedPics] = useState([]);
  const [postSubmissionError, setPostSubmissionError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ref for initial focus
  const initialRef = useRef(null);
  const postText = useUserStoreSelectors.use.postText();
  const updatePostText = useUserStoreSelectors.use.updatePostText();
  const postImagesURLs = useUserStoreSelectors.use.postImagesURLs();
  const updatePostImagesURLs = useUserStoreSelectors.use.updatePostImagesURLs();

  useEffect(() => {
    // This cleanup runs when postImagesURLs changes or the component unmounts, freeing up memory to prevent memory leaks
    return () => {
      postImagesURLs.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [postImagesURLs]);

  const handlePostTextChange = ({ target }) => {
    updatePostText(target.value); // update the postText state with the new value from the input field
    if (emptyNessCheck) setEmptyNessCheck(false);
  };
  // It allows users that preview their selected files and also updating the postImages state
  const handleImageChange = (event) => {
    const files = event.target.files; //contains the FileList object including the selected files by the user
    const postPicsArray = Array.from(files);
    setSelectedPics(postPicsArray);
    // Turn the files object into an array of urls so we can show a preview of selected files to users and also update the postImages state
    const imageUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file),
    );
    updatePostImagesURLs(imageUrls); // update the postImages state with the new image urls
    if (emptyNessCheck) setEmptyNessCheck(false);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    // Check if both postText and postImages are not empty before submitting the form
    if (postText.trim().length <= 0 || postImagesURLs.length <= 0) {
      setEmptyNessCheck(true);
      return;
    } else {
      setIsSubmitting(true);
      // Post submission logic
      try {
        await handleCreatePost(postText, selectedPics);
        // Clear the fields
        updatePostText('');
        updatePostImagesURLs([]);
        onClose();
        setIsSubmitting(false);
      } catch (error) {
        console.error(
          'Error during execution of post button handler, related to handleCreatePost():',
          error,
        );
        setPostSubmissionError('Failed to create post. Please try again.');
      }
    }
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      size='lg'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a New Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Text input for post content */}
          <Textarea
            ref={initialRef}
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
          {postImagesURLs.length > 0 && (
            <Flex mt={4} flexWrap='wrap'>
              {postImagesURLs.map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`Selected ${index}`}
                  boxSize='96px'
                  objectFit='cover'
                  m={2}
                  borderRadius='md'
                />
              ))}
            </Flex>
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
            isLoading={isSubmitting}
            loadingText='Posting'
            bgColor='pink.400'
            _hover={{ background: '#DB2796' }}
          >
            Post
          </Button>
        </ModalFooter>
        {postSubmissionError && (
          <Text color='red.500' mt={2}>
            {postSubmissionError}
          </Text>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreatePostModal;
