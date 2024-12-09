'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';
import { FiUpload, FiX } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    rectSortingStrategy,
} from '@dnd-kit/sortable';

const SortablePhoto = ({ id, url, onRemove, uploading, isDefault, onSetDefault }: any) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
        touchAction: 'none'
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}
             className="aspect-square relative">
            {url ? (
                <div className="relative w-full h-full">
                    <Image
                        src={url}
                        alt={`Profile photo ${id}`}
                        fill
                        className="rounded-xl object-cover"
                    />
                    <div 
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        className="absolute top-2 right-2 z-30"
                    >
                        <button
                            onClick={() => onRemove()}
                            className="bg-black/50 rounded-full p-1.5 hover:bg-black/70 transition-colors"
                        >
                            <FiX className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-xl
                              flex items-center justify-center">
                    {uploading ? (
                        <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#100F0A]" />
                            <span className="text-sm mt-2">Uploading...</span>
                        </div>
                    ) : (
                        <FiUpload className="w-6 h-6 text-gray-400" />
                    )}
                </div>
            )}
        </div>
    );
};


export default function Step5Photos({ formData, setFormData, errors, setErrors }: any) {
    const [defaultPhotoIndex, setDefaultPhotoIndex] = useState(0);
    const [uploading, setUploading] = useState<boolean[]>([false, false, false, false, false]);
    const [charCount, setCharCount] = useState(formData.about?.length || 0);

    useEffect(() => {
        if (!formData.photos) {
            setFormData(prev => ({ ...prev, photos: new Array(5).fill(null) }));
        }
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5000000) {
            setErrors(prev => ({ ...prev, photos: 'Image must be less than 5MB' }));
            return;
        }

        try {
            setUploading(prev => prev.map((val, i) => i === index ? true : val));
            
            const uploadData = new FormData();
            uploadData.append('file', file);
            uploadData.append('upload_preset', 'hone_profile_photos');

            const response = await fetch(
                'https://api.cloudinary.com/v1_1/db8lnhf7s/image/upload',
                {
                    method: 'POST',
                    body: uploadData
                }
            );

            const data = await response.json();
            
            if (data.secure_url) {
                const newPhotos = [...(formData.photos || [])];
                newPhotos[index] = data.secure_url;
                
                setFormData(prev => ({
                    ...prev,
                    photos: newPhotos
                }));

                if (errors.photos) {
                    setErrors(prev => ({ ...prev, photos: '' }));
                }
            }
        } catch (error) {
            console.error('Upload error:', error);
            setErrors(prev => ({ ...prev, photos: 'Failed to upload image' }));
        } finally {
            setUploading(prev => prev.map((val, i) => i === index ? false : val));
        }
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        
        if (!active || !over || active.id === over.id) return;

        const oldIndex = parseInt(active.id.split('-')[1]);
        const newIndex = parseInt(over.id.split('-')[1]);

        if (isNaN(oldIndex) || isNaN(newIndex)) return;

        const newPhotos = [...formData.photos];
        const [movedItem] = newPhotos.splice(oldIndex, 1);
        newPhotos.splice(newIndex, 0, movedItem);

        setFormData(prev => ({
            ...prev,
            photos: newPhotos
        }));

        if (defaultPhotoIndex === oldIndex) {
            setDefaultPhotoIndex(newIndex);
        }
    };

    const handleSetDefault = (index: number) => {
        setDefaultPhotoIndex(index);
        const newPhotos = [...formData.photos];
        const defaultPhoto = newPhotos[index];
        newPhotos.splice(index, 1);
        newPhotos.unshift(defaultPhoto);
        
        setFormData(prev => ({
            ...prev,
            photos: newPhotos
        }));
    };

    const handleRemovePhoto = (index: number) => {
        if (window.confirm('Are you sure you want to remove this photo?')) {
            const newPhotos = [...formData.photos];
            newPhotos[index] = null;
            
            if (index === defaultPhotoIndex) {
                const nextValidPhoto = newPhotos.findIndex(photo => photo !== null);
                setDefaultPhotoIndex(nextValidPhoto >= 0 ? nextValidPhoto : 0);
            }
            
            setFormData(prev => ({
                ...prev,
                photos: newPhotos
            }));

            if (errors.photos) {
                setErrors(prev => ({ ...prev, photos: '' }));
            }
        }
    };

const confirmPhotoRemoval = (index: number) => {
    if (window.confirm('Are you sure you want to remove this photo?')) {
        handleRemovePhoto(index);
    }
};

const handleSubmit = async () => {
    try {
        // Add validation before submission
        if (!formData.photos || formData.photos.length === 0) {
            setErrors(prev => ({ ...prev, photos: 'Please upload at least one photo' }));
            return;
        }

        if (!formData.about || formData.about.length < 50) {
            setErrors(prev => ({ ...prev, about: 'Please write at least 50 characters about yourself' }));
            return;
        }

        // Continue with form submission
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        // Redirect to login page after successful registration
        window.location.href = '/auth/login';
    } catch (error) {
        console.error('Submission error:', error);
        setErrors(prev => ({
            ...prev,
            submit: error.message || 'Something went wrong'
        }));
    }
};



return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-8"
    >
        <div>
            <div className="flex items-center justify-between mb-4">
                <label className={`text-[#100F0A] ${relative.medium.className}`}>
                    Profile Photos
                </label>
                <span className="text-sm text-gray-500">
                    Drag to reorder • First photo is profile picture
                </span>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={formData.photos?.map((_, index) => `photo-${index}`) || []}
                    strategy={rectSortingStrategy}
                >
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[...Array(5)].map((_, index) => (
                            <div key={`photo-${index}`} className="relative">
                            <SortablePhoto
                                id={`photo-${index}`}
                                url={formData.photos?.[index]}
                                onRemove={() => handleRemovePhoto(index)}
                                onSetDefault={() => handleSetDefault(index)}
                                isDefault={index === defaultPhotoIndex}
                                uploading={uploading[index]}
                            />
                            {!formData.photos?.[index] && (
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, index)}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-20"
                                />
                            )}
                        </div>
                        
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {errors?.photos && (
                <p className="text-red-500 text-sm mt-2">{errors.photos}</p>
            )}
        </div>

        <div>
            <div className="flex items-center justify-between mb-2">
                <label className={`text-[#100F0A] ${relative.medium.className}`}>
                    About Me
                </label>
                <span className={`text-sm text-gray-500 ${relative.book.className}`}>
                    {charCount}/500
                </span>
            </div>
            <textarea
                value={formData.about}
                onChange={(e) => {
                    const text = e.target.value;
                    if (text.length <= 500) {
                        setFormData(prev => ({ ...prev, about: text }));
                        setCharCount(text.length);
                        if (errors?.about) setErrors(prev => ({ ...prev, about: '' }));
                    }
                }}
                placeholder="Share something about yourself, your faith journey, and what you're looking for..."
                className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#100F0A] text-[#100F0A] h-40 resize-none"
            />
            {errors?.about && (
                <p className="text-red-500 text-sm mt-1">{errors.about}</p>
            )}
        </div>
    </motion.div>
);
}
