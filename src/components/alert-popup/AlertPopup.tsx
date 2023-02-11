import './AlertPopup.scss'
import React, {Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {Icon} from "../icon/Icon";
import {Button} from "../button/Button";
export const AlertPopup:React.FC<{closeModal:any,
    warningDescription:string}>=({closeModal,warningDescription})=>{
    return     <>
        <Transition appear show={true} as={Fragment}>
            <Dialog className="dialog" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="fixed inset-0 wrapper" />
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
                            leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="dialog-panel w-full transform overflow-hidden bg-white text-center align-middle transition-all">
                                <div className="popup-holder">
                                    <div className={"warning-icon-holder"}>
                                        <div className={"warning-icon-bg"}>
                                            <Icon name={"bigDetectAlert"} />
                                        </div>
                                    </div>
                                    <div className={"popup-main-text"}>
                                        <Dialog.Title className="title typography-h2-title">Something wrong</Dialog.Title>
                                        <span className="typography-paragraph delay-subtitle">{warningDescription}</span>
                                        <Button width={100} functionAction={closeModal} title={"ok"} />
                                    </div>
                                    <div className={"empty-side-area"}></div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>

}