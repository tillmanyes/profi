"use client"

import { addUserEmailToProduct } from '@/lib/actions';
import { Dialog, DialogPanel, DialogTitle, Description, Transition, TransitionChild } from '@headlessui/react';
import Image from 'next/image';
import { FormEvent, Fragment, useState } from 'react';

interface Props {
    productId: string
}

const Modal = ({ productId }: Props) => {
    let [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);


        await addUserEmailToProduct(productId, email);

        setIsSubmitting(false)
        setEmail('')
        closeModal()
    }


    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <button className='btn' onClick={openModal}>Track</button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    {/* Backdrop using TransitionChild */}
                    <TransitionChild
                        as="div" // Use a div to be able to apply className
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        className="fixed inset-0 bg-black/30" // Semi-transparent backdrop
                    />

                    {/* Container to center the panel */}
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <TransitionChild
                            as="div"
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-md bg-white p-8 rounded-lg shadow">
                                <div className='flex justify-between'>
                                    <div className='p-3 border border-gray-200 rounded'>
                                        <Image
                                            src="/assets/icons/logo.svg"
                                            alt="logo"
                                            width={28}
                                            height={28}
                                        />
                                    </div>

                                    <Image
                                        src="/assets/icons/x-close.svg"
                                        alt="close"
                                        width={24}
                                        height={24}
                                        className='cursor-pointer'
                                        onClick={closeModal}
                                    />
                                </div>

                                <h4 className='dialog-head_text'>Stay updated with product pricing alerts right in your inbox!</h4>

                                <p className='text-sm text-gray-600 mt-2'>Never miss a bargain again with our timely alerts!</p>
                                <form className='flex flex-col mt-5' onSubmit={handleSubmit}>
                                    <label htmlFor="email" className='text-sm font-medium text-gray-700'>
                                        Email adress
                                    </label>
                                    <div className='dialog-input_container'>
                                    <Image
                                            src="/assets/icons/mail.svg"
                                            alt="mail"
                                            width={18}
                                            height={18}
                                        />
                                        <input
                                            required
                                            type="email"
                                            id='email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder='Enter your email adress'
                                            className='dialog-input'
                                            autoComplete='off'
                                            />
                                    </div>

                                    <button type='submit'
                                    className='dialog-btn'
                                    >
                                       {isSubmitting ? 'Submitting...' : 'Track'}

                                    </button>
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default Modal;