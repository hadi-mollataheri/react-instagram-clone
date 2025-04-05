/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
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
} from '@chakra-ui/react';
import { handleCreatePost, supabase } from '../../utilities/supabase-apiCalls';
import { v4 as uuidv4 } from 'uuid';

const CreatePostModal = ({ isOpen, onClose }) => {
  const [emptyNessCheck, setEmptyNessCheck] = useState(null);
  // We'll store selected File objects—instead of uploading them immediately.
  const [selectedPics, setSelectedPics] = useState([]);
  // This state holds preview URLs (generated using URL.createObjectURL)
  const [postImagesURLs, updatePostImagesURLs] = useState([]);
  const [postText, updatePostText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ref for initial focus.
  const initialRef = useRef(null);

  // Cleanup preview URLs when component unmounts to avoid memory leaks.
  useEffect(() => {
    return () => {
      postImagesURLs.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [postImagesURLs]);

  const handlePostTextChange = ({ target }) => {
    updatePostText(target.value);
    if (emptyNessCheck) setEmptyNessCheck(false);
  };

  // When the user selects images, we update the state but do not upload yet.
  const handleImageChange = (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    // Convert the FileList into an array of File objects.
    const filesArray = Array.from(files);
    setSelectedPics(filesArray);

    // Create preview URLs for instant feedback.
    const imageUrls = filesArray.map((file) => URL.createObjectURL(file));
    updatePostImagesURLs(imageUrls);
    if (emptyNessCheck) setEmptyNessCheck(false);
  };

  // When the user clicks "Post," upload the images and then submit the post.
  const handleSubmit = async () => {
    // Check if there is post text and at least one selected image.
    if (postText.trim().length <= 0 || selectedPics.length <= 0) {
      setEmptyNessCheck(true);
      return;
    }
    setIsSubmitting(true);
    try {
      const uploadedURLs = [];
      // Upload each File object to Supabase Storage.
      for (const file of selectedPics) {
        // Uploading directly to the bucket's root by not prefixing a folder.
        const filePath = `${uuidv4()}-${file.name}`;
        const { data, error } = await supabase.storage
          .from('posts-images')
          .upload(filePath, file, { contentType: file.type });

        if (error) {
          console.error('Upload error:', error);
          continue; // Optionally, handle the error (or abort the process).
        }
        // Retrieve the public URL using the stored path.
        const publicUrlResponse = supabase.storage
          .from('posts-images')
          .getPublicUrl(data.path);
        const {
          data: { publicUrl },
        } = publicUrlResponse;
        if (publicUrl) {
          uploadedURLs.push(publicUrl);
        }
      }
      // Now that all images are uploaded and we have their public URLs,
      // call your API to create the post with the provided text and image URLs.
      await handleCreatePost(postText, uploadedURLs);
      // Clear the fields once the post is created.
      updatePostText('');
      updatePostImagesURLs([]);
      setSelectedPics([]);
      onClose();
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error creating post:', error);

      setIsSubmitting(false);
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
          {/* Text input for the post content */}
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
                  alt={`Uploaded preview ${index}`}
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
          {emptyNessCheck && (
            <p className='text-sm text-red-300'>
              <span className='text-2xl text-red-600'>*</span> Please fill out
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
      </ModalContent>
    </Modal>
  );
};

export default CreatePostModal;
