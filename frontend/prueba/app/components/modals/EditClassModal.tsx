'use client';

import { useState, useEffect, FC, ChangeEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Modal from './Modal';
import CustomButton from '../forms/CustomButton';
import apiService from '@/app/services/apiService';
import { ClassItem } from '@/app/types/ClassItem';

interface EditClassModalProps {
  params: { id: string };
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { value: 'math', label: 'Math' },
  { value: 'language', label: 'Language' },
  { value: 'programming', label: 'Programming' },
  { value: 'arts', label: 'Arts' },
  { value: 'grammatical', label: 'Grammatical' },
];

const EditClassModal: FC<EditClassModalProps> = ({ params, isOpen, onClose }) => {
  const [classItem, setClassItem] = useState<ClassItem | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [dataTitle, setDataTitle] = useState('');
  const [dataDescription, setDataDescription] = useState('');
  const [dataPrice, setDataPrice] = useState('');
  const [dataDuration, setDataDuration] = useState('');
  const [dataMaxStudents, setDataMaxStudents] = useState('');
  const [dataSubject, setDataSubject] = useState('');
  const [dataImage, setDataImage] = useState<File | null>(null);
  const [video480p, setVideo480p] = useState<File | null>(null);
  const [video720p, setVideo720p] = useState<File | null>(null);
  const [video1080p, setVideo1080p] = useState<File | null>(null);
  const [externalVideoUrl, setExternalVideoUrl] = useState<string>('');
  const [subtitles, setSubtitles] = useState<File[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const fetchedClassItem: ClassItem = await apiService.get(`/api/classes/${params.id}`);
        setClassItem(fetchedClassItem);
        setSelectedCategory(fetchedClassItem.category || '');
        setDataTitle(fetchedClassItem.title || '');
        setDataDescription(fetchedClassItem.description || '');
        setDataPrice(fetchedClassItem.price_per_session || '');
        setDataDuration(fetchedClassItem.duration_in_minutes.toString() || '');
        setDataMaxStudents(fetchedClassItem.max_students.toString() || '');
        setDataSubject(fetchedClassItem.subject || '');
        setExternalVideoUrl(fetchedClassItem.video_url || '');
      } catch (error) {
        console.error('Failed to fetch class data:', error);
      }
    };

    if (isOpen) {
      fetchClassData();
    }
  }, [params.id, isOpen]);

  const setImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const tmpImage = event.target.files[0];
      setDataImage(tmpImage);
    }
  };

  const setVideoHandler = (setter: React.Dispatch<React.SetStateAction<File | null>>) => (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const tmpVideo = event.target.files[0];
      setter(tmpVideo);
    }
  };

  const setSubtitlesHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSubtitles(Array.from(event.target.files));
    }
  };

  const submitForm = async () => {
    const formData = new FormData();
    if (selectedCategory) formData.append('category', selectedCategory);
    if (dataTitle) formData.append('title', dataTitle);
    if (dataDescription) formData.append('description', dataDescription);
    if (dataPrice) formData.append('price_per_session', dataPrice);
    if (dataDuration) formData.append('duration_in_minutes', dataDuration);
    if (dataMaxStudents) formData.append('max_students', dataMaxStudents);
    if (dataSubject) formData.append('subject', dataSubject);
    if (dataImage) formData.append('image', dataImage);

    if (video480p) formData.append('video_480p', video480p);
    if (video720p) formData.append('video_720p', video720p);
    if (video1080p) formData.append('video_1080p', video1080p);
    if (externalVideoUrl) formData.append('external_video_url', externalVideoUrl);
    subtitles.forEach((subtitle) => {
      formData.append('subtitles', subtitle);
    });

    try {
      const response = await apiService.post(`/api/classes/update/${params.id}/`, formData);
      console.log('response: ', response);

      if (response && response.success) {
        router.push(`/classes/${params.id}?updated=true`);
        onClose();
      } else if (response && response.errors) {
        const tmpErrors: string[] = Object.values(response.errors).map((error: any) => error);
        setErrors(tmpErrors);
      } else {
        setErrors(['An unknown error occurred']);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrors([error.message]);
      } else {
        setErrors(['An unknown error occurred']);
      }
    }
  };

  const content = (
    <>
      {currentStep === 1 ? (
        <>
          <h2 className='mb-6 text-2xl'>Choose category</h2>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full h-14 px-4 border border-gray-300 rounded-xl"
          >
            <option value="" disabled>Select a category</option>
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <CustomButton label='Next' onClick={() => setCurrentStep(2)} />
        </>
      ) : currentStep === 2 ? (
        <>
          <h2 className='mb-6 text-2xl'>Describe your class</h2>
          <div className='pt-3 pb-6 space-y-4'>
            <div className='flex flex-col space-y-2'>
              <label>Title</label>
              <input
                type="text"
                value={dataTitle}
                onChange={(e) => setDataTitle(e.target.value)}
                className='w-full p-4 border border-gray-600 rounded-xl'
              />
            </div>
            <div className='flex flex-col space-y-2'>
              <label>Description</label>
              <textarea
                value={dataDescription}
                onChange={(e) => setDataDescription(e.target.value)}
                className='w-full h-[200px] p-4 border border-gray-600 rounded-xl'
              ></textarea>
            </div>
          </div>
          <CustomButton label='Previous' className='mb-2 bg-black hover:bg-gray-800' onClick={() => setCurrentStep(1)} />
          <CustomButton label='Next' onClick={() => setCurrentStep(3)} />
        </>
      ) : currentStep === 3 ? (
        <>
          <h2 className='mb-6 text-2xl'>Details</h2>
          <div className='pt-3 pb-6 space-y-4'>
            <div className='flex flex-col space-y-2'>
              <label>Price per session</label>
              <input
                type="number"
                value={dataPrice}
                onChange={(e) => setDataPrice(e.target.value)}
                className='w-full p-4 border border-gray-600 rounded-xl'
              />
            </div>
            <div className='flex flex-col space-y-2'>
              <label>Duration (minutes)</label>
              <input
                type="number"
                value={dataDuration}
                onChange={(e) => setDataDuration(e.target.value)}
                className='w-full p-4 border border-gray-600 rounded-xl'
              />
            </div>
            <div className='flex flex-col space-y-2'>
              <label>Maximum number of students</label>
              <input
                type="number"
                value={dataMaxStudents}
                onChange={(e) => setDataMaxStudents(e.target.value)}
                className='w-full p-4 border border-gray-600 rounded-xl'
                required={false}
              />
            </div>
            <div className='flex flex-col space-y-2'>
              <label>Subject</label>
              <input
                type="text"
                value={dataSubject}
                onChange={(e) => setDataSubject(e.target.value)}
                className='w-full p-4 border border-gray-600 rounded-xl'
                required={false}
              />
            </div>
          </div>
          <CustomButton label='Previous' className='mb-2 bg-black hover:bg-gray-800' onClick={() => setCurrentStep(2)} />
          <CustomButton label='Next' onClick={() => setCurrentStep(4)} />
        </>
      ) : (
        <>
          <h2 className='mb-4 text-2xl'>Media</h2>
          <div className='media-section max-h-96 overflow-y-auto pt-3 pb-6 space-y-4'>
            <div className='py-4 px-6 bg-gray-600 text-white rounded-xl'>
              <label htmlFor="imageUpload">Upload Image</label>
              <input id="imageUpload" type="file" accept='image/*' onChange={setImage} />
            </div>
            {dataImage && (
              <div className='w-[100px] h-[100px] relative'>
                <Image
                  src={URL.createObjectURL(dataImage)}
                  alt="Uploaded image"
                  fill
                  style={{ objectFit: 'cover' }}
                  className='rounded-xl'
                />
              </div>
            )}
            <div className='py-2 px-6 bg-gray-600 text-white rounded-xl'>
              <label htmlFor="video480pUpload">Upload Video 480p</label>
              <input id="video480pUpload" type="file" accept='video/*' onChange={setVideoHandler(setVideo480p)} />
            </div>
            <div className='py-2 px-6 bg-gray-600 text-white rounded-xl'>
              <label htmlFor="video720pUpload">Upload Video 720p</label>
              <input id="video720pUpload" type="file" accept='video/*' onChange={setVideoHandler(setVideo720p)} />
            </div>
            <div className='py-2 px-6 bg-gray-600 text-white rounded-xl'>
              <label htmlFor="video1080pUpload">Upload Video 1080p</label>
              <input id="video1080pUpload" type="file" accept='video/*' onChange={setVideoHandler(setVideo1080p)} />
            </div>
            <div className='flex flex-col space-y-2'>
              <label>External Video URL</label>
              <input
                type="url"
                value={externalVideoUrl}
                onChange={(e) => setExternalVideoUrl(e.target.value)}
                className='w-full p-4 border border-gray-600 rounded-xl'
              />
            </div>
            <div className='py-2 px-6 bg-gray-600 text-white rounded-xl'>
              <label>Upload Subtitles</label>
              <input type="file" accept='.vtt' multiple onChange={setSubtitlesHandler} />
            </div>
          </div>
          {errors.length > 0 && (
            <div className='p-5 mb-2 bg-red-500 text-white rounded-xl'>
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
          <CustomButton label='Previous' className='mb-2 bg-black hover:bg-gray-800' onClick={() => setCurrentStep(3)} />
          <CustomButton label='Submit' onClick={submitForm} />
        </>
      )}
    </>
  );

  return (
    <Modal isOpen={isOpen} close={onClose} label="Edit Class" content={content} />
  );
};

export default EditClassModal;




