'use client';

import Modal from "./Modal";
import { useState } from "react";
import CustomButton from "../forms/CustomButton";
import useSearchModal, { SearchQuery } from "@/app/hooks/useSearchModal";

const SearchModal = () => {
    let content = (<></>);
    const searchModal = useSearchModal();
    const [numStudents, setNumStudents] = useState<string>('1');
    const [subject, setSubject] = useState<string>('');
    const [price, setPrice] = useState<string>('');

    const closeAndSearch = () => {
        const newSearchQuery: SearchQuery = {
            students: parseInt(numStudents),
            subject: subject,
            price: parseFloat(price)
        }
        searchModal.setQuery(newSearchQuery);
        searchModal.close();
    }

    const contentSubject = (
        <>
            <h2 className="mb-6 text-2xl">What subject are you looking for?</h2>

            <input
                type="text"
                value={subject}
                placeholder="Subject..."
                onChange={(e) => setSubject(e.target.value)}
                className="w-full h-14 px-4 border border-gray-300 rounded-xl"
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="Next ->"
                    onClick={() => searchModal.open('details')}
                />
            </div>
        </>
    )

    const contentDetails = (
        <>
            <h2 className="mb-6 text-2xl">Details</h2>

            <div className="space-y-4">
                <div className="space-y-4">
                    <label>Number of students:</label>
                    <input 
                        type="number" 
                        min="1" 
                        value={numStudents} 
                        placeholder="Number of students..."
                        onChange={(e) => setNumStudents(e.target.value)} 
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>

                <div className="space-y-4">
                    <label>Price range:</label>
                    <input 
                        type="number" 
                        min="1" 
                        value={price} 
                        placeholder="Maximum price..."
                        onChange={(e) => setPrice(e.target.value)} 
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>
            </div>

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="<- Subject"
                    onClick={() => searchModal.open('subject')}
                />

                <CustomButton
                    label="Search"
                    onClick={closeAndSearch}
                />
            </div>
        </>
    )

    if (searchModal.step === 'subject') {
        content = contentSubject;
    } else if (searchModal.step === 'details') {
        content = contentDetails;
    }

    return (
        <Modal
            label="Search"
            content={content}
            close={searchModal.close}
            isOpen={searchModal.isOpen}
        />
    )
}

export default SearchModal;