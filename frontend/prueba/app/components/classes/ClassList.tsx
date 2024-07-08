'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ClassListItem from "./ClassListItem";
import apiService from '@/app/services/apiService';
import useSearchModal from '@/app/hooks/useSearchModal';

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

interface ClassListProps {
    professor_id?: string | null;
    favorites?: boolean | null;
}

const ClassList: React.FC<ClassListProps> = ({
    professor_id,
    favorites
}) => {
    const params = useSearchParams();
    const searchModal = useSearchModal();
    const subject = searchModal.query.subject;
    const price = searchModal.query.price;
    const [classes, setClasses] = useState<ClassType[]>([]);

    console.log('searchQuery:', searchModal.query);

    // Function to update the favorite status of a class (on progress)
    const markFavorite = (id: string, is_favorite: boolean) => {
        const tmpClasses = classes.map((classItem: ClassType) => {
            if (classItem.id === id) {
                classItem.is_favorite = is_favorite;
                console.log(is_favorite ? 'added to list of favorited classes' : 'removed from list');
            }
            return classItem;
        });
        setClasses(tmpClasses);
    };

    // Function to fetch classes based on query parameters
    const getClasses = async () => {
        let url = '/api/classes/';

        if (professor_id) {
            url += `?professor_id=${professor_id}`;
        } else if (favorites) {
            url += '?is_favorites=true';
        } else {
            let urlQuery = '';

            if (subject) {
                urlQuery += '&subject=' + subject;
            }

            if (price) {
                urlQuery += '&price=' + price;
            }

            if (urlQuery.length) {
                console.log('Query:', urlQuery);
                urlQuery = '?' + urlQuery.substring(1);
                url += urlQuery;
            }
        }

        const tmpClasses = await apiService.get(url);

        setClasses(tmpClasses.data.map((classItem: ClassType) => {
            classItem.is_favorite = tmpClasses.favorites.includes(classItem.id);
            return classItem;
        }));
    };

    // Fetch classes whenever the search parameters or query changes
    useEffect(() => {
        getClasses();
    }, [subject, searchModal.query, params]);

    return (
        <>
            {classes.map((classItem) => (
                <ClassListItem 
                    key={classItem.id}
                    classItem={classItem}
                    markFavorite={(is_favorite: any) => markFavorite(classItem.id, is_favorite)}
                />
            ))}
        </>
    );
};

export default ClassList;
