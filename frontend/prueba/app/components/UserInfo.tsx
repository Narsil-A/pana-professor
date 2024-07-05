'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CustomButton from "@/app/components/forms/CustomButton";
import apiService from "@/app/services/apiService";
import { getUserId, resetAuthCookies } from "@/app/lib/actions";

const UserInfo: React.FC = () => {
    const router = useRouter();
    const [userData, setUserData] = useState({ username: '', name: '', email: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const userId = await getUserId();
            setUserId(userId);

            if (!userId) {
                router.push('/');
                return;
            }

            const fetchUserData = async () => {
                try {
                    const response = await apiService.get('/api/auth/');
                    console.log('RESPONSE: ', response);
                    setUserData({
                        username: response.username,
                        name: response.name,
                        email: response.email
                    });
                } catch (error) {
                    setErrors([(error as Error).message]);
                } finally {
                    setLoading(false);
                }
            };

            fetchUserData();
        };

        checkAuth();
    }, [router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleUpdate = async () => {
        try {
            const response = await apiService.put('/api/auth/update/', userData);
            setUserData({
                username: response.username,
                name: response.name,
                email: response.email
            });
            setIsEditing(false);
        } catch (error) {
            setErrors([(error as Error).message]);
        }
    };

    const handleDelete = async () => {
        try {
            await apiService.delete('/api/auth/delete/');
            resetAuthCookies();
            router.push('/');
        } catch (error) {
            setErrors([(error as Error).message]);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-semibold mb-4 text-center">User Information</h2>
                {errors.length > 0 && (
                    <div className="mb-4">
                        {errors.map((error, index) => (
                            <p key={index} className="text-red-500">
                                {error}
                            </p>
                        ))}
                    </div>
                )}
                <div className="space-y-4">
                    <label className="block">
                        <span className="text-gray-700">Username:</span>
                        <input
                            type="text"
                            name="username"
                            value={userData.username}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Name:</span>
                        <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Email:</span>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </label>
                </div>
                <div className="mt-6 flex justify-between">
                    {isEditing ? (
                        <>
                            <CustomButton label="Save" onClick={handleUpdate} className="px-4 py-2 text-sm" />
                            <CustomButton label="Cancel" onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm" />
                        </>
                    ) : (
                        <>
                            <CustomButton label="Edit" onClick={() => setIsEditing(true)} className="px-4 py-2 text-sm" />
                            <CustomButton label="Delete" onClick={handleDelete} className="px-4 py-2 text-sm" />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserInfo;