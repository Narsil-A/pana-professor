'use client';

import Modal from "./Modal";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../forms/CustomButton";
import { handleLogin } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const submitLogin = async () => {
        const formData = {
            username: username,
            password: password
        };

        try {
            const response = await apiService.postWithoutToken('/api/auth/login/', formData);

            if (response.access) {
                handleLogin(response.user.pk, response.access, response.refresh);
                loginModal.close();
                router.push('/');
            } else {
                setErrors(response.non_field_errors);
            }
        } catch (error) {
            setErrors([(error as Error).message]);
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitLogin();
    };

    const content = (
        <>
            <form onSubmit={handleFormSubmit} className="space-y-4">
                <input onChange={(e) => setUsername(e.target.value)} placeholder="Your username" type="text" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" /> 
                <input onChange={(e) => setPassword(e.target.value)} placeholder="Your password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
                {errors.map((error, index) => (
                    <div key={`error_${index}`} className="p-5 bg-excuela text-white rounded-xl opacity-80">
                        {error}
                    </div>
                ))}
                <CustomButton label="Submit" onClick={submitLogin} />
            </form>
        </>
    );

    return (
        <Modal
            isOpen={loginModal.isOpen}
            close={loginModal.close}
            label="Log in"
            content={content}
        />
    );
};

export default LoginModal;