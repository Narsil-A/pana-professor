'use client';

import { useState } from 'react';
import Image from 'next/image';
import useSearchModal, { SearchQuery } from '../hooks/useSearchModal';

const Categories = () => {
    const searchModal = useSearchModal();
    const [category, setCategory] = useState('');

    const _setCategory = (_category: string) => {
        setCategory(_category);

        const query: SearchQuery = {
            students: searchModal.query.students,
            subject: _category,
            price: searchModal.query.price
        }

        searchModal.setQuery(query);
    }

    return (
        <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
            <div 
                onClick={() => _setCategory('')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == '' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/excuela.png"
                    alt="Category - All"
                    width={20}
                    height={20}
                />
                <span className='text-xs'>All</span>
            </div>
            
            <div 
                onClick={() => _setCategory('math')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'math' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/math.jpg"
                    alt="Category - Math"
                    width={20}
                    height={20}
                />
                <span className='text-xs'>Math</span>
            </div>

            <div 
                onClick={() => _setCategory('science')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'science' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/science.jpg"
                    alt="Category - Science"
                    width={20}
                    height={20}
                />
                <span className='text-xs'>Science</span>
            </div>

            <div 
                onClick={() => _setCategory('arts')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'arts' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/arts.jpg"
                    alt="Category - Arts"
                    width={20}
                    height={20}
                />
                <span className='text-xs'>Arts</span>
            </div>

            <div 
                onClick={() => _setCategory('languages')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'languages' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/languages.jpg"
                    alt="Category - Languages"
                    width={20}
                    height={20}
                />
                <span className='text-xs'>Languages</span>
            </div>

            <div 
                onClick={() => _setCategory('technology')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'technology' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/technology.jpg"
                    alt="Category - Technology"
                    width={20}
                    height={20}
                />
                <span className='text-xs'>Technology</span>
            </div>
        </div>
    )
}

export default Categories;