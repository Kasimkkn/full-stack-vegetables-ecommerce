import { CircleX } from 'lucide-react';
import React from 'react'

const CommonModal = ({
    isOpen,
    onClose,
    children,
}: {
    isOpen: boolean;
    onClose?: () => void;
    children: React.ReactNode;
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white rounded-lg shadow p-3">
                {onClose && typeof onClose === 'function' && (
                    <button onClick={onClose} className="text-white absolute right-1 top-2 bg-mainBg rounded-full p-2 text-lg mb-4">
                        <CircleX />
                    </button>
                )}
                {children}
            </div>
        </div>
    );
};


export default CommonModal