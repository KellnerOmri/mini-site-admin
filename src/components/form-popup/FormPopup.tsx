import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import {Icon} from "../icon/Icon";
import './FormPopup.scss'
import {Button} from "../button/Button";
import {text} from "../../utils/dictionaryManagement";
import {useAppSelector} from "../../app/hooks";
export const FormPopup:React.FC<{ children: React.ReactNode ,title:string,formId:string,show:boolean,closeModalFunction:any}>=({children,title,formId,show,closeModalFunction})=> {
    const {isEnglish} = useAppSelector(state => state.global);

    const closeModal=() =>{
        closeModalFunction()
    }

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="dialog relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="wrapper fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="dialog-panel w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div onClick={() => closeModal()} className="close_x_icon">
                                        <button>
                                            <Icon name={"close_x"} />
                                        </button>
                                    </div>
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 text-center"
                                    >
                                        {title}
                                    </Dialog.Title>
                                    <div className="modal-scroll-wrapper">
                                        {children}
                                    </div>
                                    <div className=" reset_default footer-customize">
                                        <div className="footer-buttons-wrapper">
                                            <Button color="secondary" title={isEnglish?text.cancel:text.H_cancel} functionAction={closeModal}></Button>
                                            <Button type={"submit"} form={formId} color="primary" title={isEnglish?text.save:text.H_save} functionAction={()=>{}}></Button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
