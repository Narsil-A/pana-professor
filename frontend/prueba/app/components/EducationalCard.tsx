'use client';

import { FC } from 'react';
import Image from 'next/image';

// Props interface for the EducationalCard component
interface EducationalCardProps {
  title: string;       
  image: string;        
  description: string;  
  buttonLabel: string;  
  onClick: () => void;  
  isActive: boolean;    
}

// Main EducationalCard component
const EducationalCard: FC<EducationalCardProps> = ({ title, image, description, buttonLabel, onClick, isActive }) => {
  return (
    <div
      onClick={onClick}  // Handle click events on the card
      className={`cardContainer ${isActive ? 'active' : ''}`}  // Apply active style if the card is active
    >
      <CardImage src={image} alt={`Category - ${title}`} />  
      <CardTitle title={title} />  
      <CardDescription description={description} />  
      <CardButton label={buttonLabel} />  
    </div>
  );
};

export default EducationalCard;

// Component to render the card image
const CardImage: FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <div className="flex-shrink-0 w-20 h-20">
    <Image src={src} alt={alt} width={80} height={80} className="rounded-md object-cover w-full h-full" />
  </div>
);

// Component to render the card title
const CardTitle: FC<{ title: string }> = ({ title }) => (
  <h3 className="mt-2 text-lg font-semibold text-center">{title}</h3>
);

// Component to render the card description
const CardDescription: FC<{ description: string }> = ({ description }) => (
  <p className="mt-1 text-sm text-center cardDescription">{description}</p>
);

// Component to render the card button
const CardButton: FC<{ label: string }> = ({ label }) => (
  <button className="px-4 py-2 cardButton">
    {label}
  </button>
);
