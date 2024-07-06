'use client';

import { format } from 'date-fns';
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

    const markFavorite = (id: string, is_favorite: boolean) => {
        const tmpClasses = classes.map((classItem: ClassType) => {
            if (classItem.id == id) {
                classItem.is_favorite = is_favorite;

                if (is_favorite) {
                    console.log('added to list of favorited classes');
                } else {
                    console.log('removed from list');
                }
            }

            return classItem;
        });

        setClasses(tmpClasses);
    };

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
            if (tmpClasses.favorites.includes(classItem.id)) {
                classItem.is_favorite = true;
            } else {
                classItem.is_favorite = false;
            }

            return classItem;
        }));
    };

    useEffect(() => {
        getClasses();
    }, [subject, searchModal.query, params]);

    return (
        <>
            {classes.map((classItem) => {
                return (
                    <ClassListItem 
                        key={classItem.id}
                        classItem={classItem}
                        markFavorite={(is_favorite: any) => markFavorite(classItem.id, is_favorite)}
                    />
                );
            })}
        </>
    );
};

export default ClassList;