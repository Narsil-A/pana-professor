'use client';

import { useState, useEffect } from 'react';
import EducationalCard from './EducationalCard';
import ClassListItem from '../components/classes/ClassListItem';
import useSearchModal, { SearchQuery } from '../hooks/useSearchModal';
import apiService from '@/app/services/apiService';

interface Category {
  key: string;
  title: string;
  image: string;
  description: string;
}

export interface ClassType {
  id: string;
  title: string;
  description: string;
  price_per_session: number;
  duration_in_minutes: number;
  max_students: number;
  subject: string;
  category: string;
  image_url: string;
  is_favorite: boolean;
  professor: string;
}

const Categories = () => {
  const searchModal = useSearchModal();
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [classes, setClasses] = useState<ClassType[]>([]);

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiService.getWithoutToken('/api/classes/categories/');
        setCategories(response);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch classes when the category changes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await apiService.getWithoutToken(`/api/classes/by-category/?category=${category}`);
        setClasses(response);
      } catch (error) {
        console.error('Failed to fetch classes:', error);
      }
    };

    if (category) {
      fetchClasses();
    } else {
      setClasses([]); // Clear classes when no category is selected
    }
  }, [category]);

  const _setCategory = (_category: string) => {
    setCategory(_category);

    const query: SearchQuery = {
      students: searchModal.query.students,
      subject: _category,
      price: searchModal.query.price,
    };

    searchModal.setQuery(query);
  };
  // funcionalitie not complete yet. 
  const markFavorite = (id: string, is_favorite: boolean) => {
    const tmpClasses = classes.map((classItem: ClassType) => {
      if (classItem.id === id) {
        classItem.is_favorite = is_favorite;
      }
      return classItem;
    });

    setClasses(tmpClasses);
  };

  return (
    <div>
      <div className="pt-3 pb-6 flex space-x-6">
        {categories.map((cat) => (
          <EducationalCard
            key={cat.key}
            title={cat.title}
            image={cat.image}
            description={cat.description}
            buttonLabel="View More"
            onClick={() => _setCategory(cat.key)}
            isActive={category === cat.key}
          />
        ))}
      </div>
      <div className="pt-3 pb-6">
        {classes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.map((classItem) => (
              <ClassListItem 
                key={classItem.id}
                classItem={classItem}
                markFavorite={(is_favorite: any) => markFavorite(classItem.id, is_favorite)}
              />
            ))}
          </div>
        ) : (
          category && <p>No classes available for this category.</p>
        )}
      </div>
    </div>
  );
};

export default Categories;
