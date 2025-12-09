import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import "./_index.scss";
import image from "../../assets/images/Certi.png"
import ModalContext from '../../context/ModalProvider';
import { AdminService } from '../../services/AdminService';
import { toast } from 'react-toastify';

const SingleRequestModal = ({ isModalOpen, handleCancel }) => {
    const {selectedRequest} = useContext(ModalContext);
    const handleAccept = async () => {
        if(selectedRequest){
            const response = await AdminService.approveRequest([selectedRequest.id]);
            if(response){
                toast.success("Accepted Request")
                handleCancel();
            }
        }
        
    };
    
    const handleDecline = async () => {
        if(selectedRequest){
            const response = await AdminService.declineRequest([selectedRequest.id]);
            if(response){
                toast.success("Declined Request")
                handleCancel();
            }
        }
    }
    useEffect(()=>{
        console.log(selectedRequest)
    },[isModalOpen])

    return (
        <Modal open={isModalOpen} onCancel={handleCancel} centered={true} footer={null} width={"max-content"} closeIcon={false}>
            <div className="request-modal">
                <div className="head">
                    <h1>{selectedRequest.businessName}</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ cursor: "pointer" }} onClick={handleCancel}>
                        <path d="M11 12.9444L2.44438 21.5C2.17588 21.7685 1.85181 21.9028 1.47217 21.9028C1.09256 21.9028 0.768488 21.7685 0.49996 21.5C0.231432 21.2314 0.097168 20.9074 0.097168 20.5278C0.097168 20.1481 0.231432 19.824 0.49996 19.5555L9.05554 11L0.49996 2.44438C0.231432 2.17588 0.097168 1.85181 0.097168 1.47217C0.097168 1.09256 0.231432 0.768487 0.49996 0.499959C0.768488 0.231432 1.09256 0.097168 1.47217 0.097168C1.85181 0.097168 2.17588 0.231432 2.44438 0.499959L11 9.05554L19.5555 0.499959C19.824 0.231432 20.1481 0.097168 20.5278 0.097168C20.9074 0.097168 21.2314 0.231432 21.5 0.499959C21.7685 0.768487 21.9028 1.09256 21.9028 1.47217C21.9028 1.85181 21.7685 2.17588 21.5 2.44438L12.9444 11L21.5 19.5555C21.7685 19.824 21.9028 20.1481 21.9028 20.5278C21.9028 20.9074 21.7685 21.2314 21.5 21.5C21.2314 21.7685 20.9074 21.9028 20.5278 21.9028C20.1481 21.9028 19.824 21.7685 19.5555 21.5L11 12.9444Z" fill="#1C1B1F" />
                    </svg>
                </div>

                <div className="body">
                    <div className="left">
                        <div className="image">
                            <img src={image} alt="" />
                        </div>
                        <h3>Business Registration</h3>
                    </div>
                    <div className="right">
                        <div className="top">
                            <div className="data-items"><div className="title">Business Name -</div>{selectedRequest.businessName}</div>
                            <div className="data-items"><div className="title">Business Address -</div>{selectedRequest.businessAddress}</div>
                            <div className="data-items"><div className="title">Company Registration Number -</div>{selectedRequest.companyRegistration}</div>
                            <div className="data-items"><div className="title">Business Email -</div>{selectedRequest.businessEmail}</div>
                            <div className="data-items"><div className="title">Contact Number -</div>{selectedRequest.mobileNumber}</div>
                            <div className="data-items"><div className="title">Status - </div><span className={selectedRequest.status === 2 ? "approved" : selectedRequest.status === 1 ? "pending" : "declined"}>{selectedRequest.status === 2 ? "Accepted" : selectedRequest.status === 1 ? "Pending" : "Declined"}</span></div>
                        </div>
                        <div className="bottom">
                            <div className="download-btn">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <mask
                                        id="mask0_789_1663"
                                        style={{ maskType: "alpha" }}
                                        maskUnits="userSpaceOnUse"
                                        x={0}
                                        y={0}
                                        width={24}
                                        height={24}
                                    >
                                        <rect width={24} height={24} fill="#D9D9D9" />
                                    </mask>
                                    <g mask="url(#mask0_789_1663)">
                                        <path
                                            d="M12 15.3386C11.8846 15.3386 11.777 15.3181 11.6774 15.2771C11.5777 15.2361 11.4852 15.1713 11.4 15.0829L8.39133 12.0743C8.25608 11.9422 8.18814 11.7824 8.1875 11.5949C8.18685 11.4074 8.2548 11.2429 8.39133 11.1012C8.5298 10.9627 8.69245 10.893 8.8793 10.8921C9.06615 10.8911 9.22881 10.9599 9.36728 11.0983L11.3029 13.0291V5.39925C11.3029 5.20823 11.3705 5.0443 11.5057 4.90745C11.641 4.77058 11.8057 4.70215 12 4.70215C12.1942 4.70215 12.3597 4.77058 12.4966 4.90745C12.6334 5.0443 12.7019 5.20823 12.7019 5.39925V13.0291L14.6326 11.0983C14.7679 10.9631 14.9297 10.8951 15.1182 10.8945C15.3067 10.8938 15.4717 10.9627 15.6134 11.1012C15.7467 11.2429 15.8147 11.4058 15.8172 11.5901C15.8198 11.7744 15.7518 11.9358 15.6134 12.0743L12.6048 15.0829C12.5163 15.1713 12.4222 15.2361 12.3226 15.2771C12.2229 15.3181 12.1153 15.3386 12 15.3386ZM6.40863 19.2982C5.93363 19.2982 5.53043 19.1325 5.19903 18.8011C4.86761 18.4697 4.7019 18.0665 4.7019 17.5915V15.63C4.7019 15.4358 4.77034 15.2702 4.9072 15.1334C5.04405 14.9965 5.20959 14.9281 5.4038 14.9281C5.59484 14.9281 5.75878 14.9965 5.89563 15.1334C6.03248 15.2702 6.1009 15.4358 6.1009 15.63V17.5915C6.1009 17.6685 6.13296 17.739 6.19708 17.8031C6.26118 17.8672 6.3317 17.8992 6.40863 17.8992H17.5913C17.6682 17.8992 17.7387 17.8672 17.8028 17.8031C17.8669 17.739 17.899 17.6685 17.899 17.5915V15.63C17.899 15.4358 17.9674 15.2702 18.1043 15.1334C18.2411 14.9965 18.4067 14.9281 18.6009 14.9281C18.7919 14.9281 18.9559 14.9965 19.0927 15.1334C19.2296 15.2702 19.298 15.4358 19.298 15.63V17.5915C19.298 18.0665 19.1323 18.4697 18.8009 18.8011C18.4695 19.1325 18.0663 19.2982 17.5913 19.2982H6.40863Z"
                                            fill="white"
                                        />
                                    </g>
                                </svg>

                                Download PDF
                            </div>
                            <div className="action-cont">
                                <button disabled={selectedRequest.status === 2 ? true:false}  className='accept' onClick={handleAccept}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <mask
                                            id="mask0_789_693"
                                            style={{ maskType: "alpha" }}
                                            maskUnits="userSpaceOnUse"
                                            x={0}
                                            y={0}
                                            width={24}
                                            height={24}
                                        >
                                            <rect width={24} height={24} fill="#D9D9D9" />
                                        </mask>
                                        <g mask="url(#mask0_789_693)">
                                            <path
                                                d="M10.5808 14.1462L8.25765 11.8231C8.1192 11.6846 7.94517 11.6138 7.73555 11.6106C7.52593 11.6074 7.34869 11.6782 7.20382 11.8231C7.05896 11.9679 6.98653 12.1436 6.98653 12.35C6.98653 12.5564 7.05896 12.732 7.20382 12.8769L9.94805 15.6211C10.1288 15.8019 10.3397 15.8923 10.5808 15.8923C10.8218 15.8923 11.0327 15.8019 11.2134 15.6211L16.7769 10.0577C16.9153 9.9192 16.9862 9.74517 16.9894 9.53555C16.9926 9.32593 16.9218 9.14869 16.7769 9.00383C16.632 8.85896 16.4564 8.78653 16.25 8.78653C16.0436 8.78653 15.8679 8.85896 15.7231 9.00383L10.5808 14.1462ZM12.0016 21.5C10.6877 21.5 9.45268 21.2506 8.29655 20.752C7.1404 20.2533 6.13472 19.5765 5.2795 18.7217C4.42427 17.8669 3.74721 16.8616 3.24833 15.706C2.74944 14.5504 2.5 13.3156 2.5 12.0017C2.5 10.6877 2.74933 9.45268 3.248 8.29655C3.74667 7.1404 4.42342 6.13472 5.27825 5.2795C6.1331 4.42427 7.13834 3.74721 8.29398 3.24833C9.44959 2.74944 10.6844 2.5 11.9983 2.5C13.3122 2.5 14.5473 2.74933 15.7034 3.248C16.8596 3.74667 17.8652 4.42342 18.7205 5.27825C19.5757 6.1331 20.2527 7.13834 20.7516 8.29398C21.2505 9.44959 21.5 10.6844 21.5 11.9983C21.5 13.3122 21.2506 14.5473 20.752 15.7034C20.2533 16.8596 19.5765 17.8652 18.7217 18.7205C17.8669 19.5757 16.8616 20.2527 15.706 20.7516C14.5504 21.2505 13.3156 21.5 12.0016 21.5ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76664 19.225 7.87498 17.675 6.32498C16.125 4.77498 14.2333 3.99998 12 3.99998C9.76664 3.99998 7.87498 4.77498 6.32498 6.32498C4.77498 7.87498 3.99998 9.76664 3.99998 12C3.99998 14.2333 4.77498 16.125 6.32498 17.675C7.87498 19.225 9.76664 20 12 20Z"
                                                fill="white"
                                            />
                                        </g>
                                    </svg>
                                    Accept</button>

                                <button disabled={selectedRequest.status === 3 ? true:false} className='decline' onClick={handleDecline}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <mask
                                            id="mask0_789_699"
                                            style={{ maskType: "alpha" }}
                                            maskUnits="userSpaceOnUse"
                                            x={0}
                                            y={0}
                                            width={24}
                                            height={24}
                                        >
                                            <rect width={24} height={24} fill="#D9D9D9" />
                                        </mask>
                                        <g mask="url(#mask0_789_699)">
                                            <path
                                                d="M12 13.0538L15.0731 16.1269C15.2116 16.2653 15.3856 16.3362 15.5952 16.3394C15.8048 16.3426 15.982 16.2718 16.1269 16.1269C16.2718 15.982 16.3442 15.8064 16.3442 15.6C16.3442 15.3936 16.2718 15.2179 16.1269 15.0731L13.0538 12L16.1269 8.92688C16.2654 8.78843 16.3362 8.61439 16.3394 8.40478C16.3426 8.19518 16.2718 8.01794 16.1269 7.87308C15.982 7.72819 15.8064 7.65575 15.6 7.65575C15.3936 7.65575 15.218 7.72819 15.0731 7.87308L12 10.9462L8.92691 7.87308C8.78846 7.73461 8.61442 7.66378 8.40481 7.66058C8.19521 7.65736 8.01797 7.72819 7.87311 7.87308C7.72822 8.01794 7.65578 8.19358 7.65578 8.39998C7.65578 8.60638 7.72822 8.78201 7.87311 8.92688L10.9462 12L7.87311 15.0731C7.73464 15.2115 7.66381 15.3856 7.66061 15.5952C7.65739 15.8048 7.72822 15.982 7.87311 16.1269C8.01797 16.2718 8.19361 16.3442 8.40001 16.3442C8.60641 16.3442 8.78204 16.2718 8.92691 16.1269L12 13.0538ZM12.0017 21.5C10.6877 21.5 9.45271 21.2506 8.29658 20.752C7.14043 20.2533 6.13475 19.5765 5.27953 18.7217C4.4243 17.8669 3.74724 16.8616 3.24836 15.706C2.74947 14.5504 2.50003 13.3156 2.50003 12.0017C2.50003 10.6877 2.74936 9.45268 3.24803 8.29655C3.7467 7.1404 4.42345 6.13472 5.27828 5.2795C6.13313 4.42427 7.13837 3.74721 8.29401 3.24833C9.44962 2.74944 10.6844 2.5 11.9983 2.5C13.3123 2.5 14.5473 2.74933 15.7034 3.248C16.8596 3.74667 17.8653 4.42342 18.7205 5.27825C19.5757 6.1331 20.2528 7.13834 20.7517 8.29398C21.2505 9.44959 21.5 10.6844 21.5 11.9983C21.5 13.3122 21.2506 14.5473 20.752 15.7034C20.2533 16.8596 19.5766 17.8652 18.7217 18.7205C17.8669 19.5757 16.8616 20.2527 15.706 20.7516C14.5504 21.2505 13.3156 21.5 12.0017 21.5ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76664 19.225 7.87498 17.675 6.32498C16.125 4.77498 14.2333 3.99998 12 3.99998C9.76667 3.99998 7.87501 4.77498 6.32501 6.32498C4.77501 7.87498 4.00001 9.76664 4.00001 12C4.00001 14.2333 4.77501 16.125 6.32501 17.675C7.87501 19.225 9.76667 20 12 20Z"
                                                fill="#007AFF"
                                            />
                                        </g>
                                    </svg>
                                    Decline</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default SingleRequestModal;