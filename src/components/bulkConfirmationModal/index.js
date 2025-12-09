import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import "./_index.scss";
import image from "../../assets/images/Certi.png"
import ModalContext from '../../context/ModalProvider';
import { AdminService } from '../../services/AdminService';
import { toast } from 'react-toastify';

const BulkConfirmationModal = ({ isModalOpen, handleCancel, ids, action }) => {
    const { selectedRequest } = useContext(ModalContext);
    const handleAccept = async () => {
        if (selectedRequest) {
            const response = await AdminService.approveRequest(ids);
            if (response) {
                toast.success("Accepted Requests")
                handleCancel();
            }
        }

    };

    const handleDecline = async () => {
        if (selectedRequest) {
            const response = await AdminService.declineRequest(ids);
            if (response) {
                toast.success("Declined Requests")
                handleCancel();
            }
        }
    }

    return (
        <Modal open={isModalOpen} onCancel={handleCancel} centered={true} footer={null} width={"max-content"} closeIcon={false} style={{ padding: 0 }}>
            <div className="bulk-container">
                <div className="top">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={88}
                        height={88}
                        viewBox="0 0 88 88"
                        fill="none"
                    >
                        <mask
                            id="mask0_789_2155"
                            style={{ maskType: "alpha" }}
                            maskUnits="userSpaceOnUse"
                            x={0}
                            y={0}
                            width={88}
                            height={88}
                        >
                            <rect width={88} height={88} fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_789_2155)">
                            <path
                                d="M44 81.5834C43.3277 81.5834 42.6567 81.4479 41.9867 81.1769C41.3167 80.9059 40.7044 80.5219 40.15 80.0251L8.06663 47.9418C7.5698 47.3873 7.18587 46.7751 6.91484 46.105C6.64381 45.4351 6.5083 44.764 6.5083 44.0918C6.5083 43.4195 6.64381 42.7369 6.91484 42.0438C7.18587 41.3507 7.5698 40.75 8.06663 40.2418L40.15 8.15843C40.7044 7.61638 41.3167 7.22114 41.9867 6.97272C42.6567 6.72431 43.3277 6.6001 44 6.6001C44.6722 6.6001 45.3548 6.72431 46.0479 6.97272C46.741 7.22114 47.3417 7.61638 47.85 8.15843L79.9333 40.2418C80.4753 40.75 80.8706 41.3507 81.119 42.0438C81.3674 42.7369 81.4916 43.4195 81.4916 44.0918C81.4916 44.764 81.3674 45.4351 81.119 46.105C80.8706 46.7751 80.4753 47.3873 79.9333 47.9418L47.85 80.0251C47.3417 80.5219 46.741 80.9059 46.0479 81.1769C45.3548 81.4479 44.6722 81.5834 44 81.5834ZM41.25 47.7584H46.75V25.7584H41.25V47.7584ZM44 57.8418C44.7333 57.8418 45.375 57.5668 45.925 57.0168C46.475 56.4668 46.75 55.8251 46.75 55.0918C46.75 54.3584 46.475 53.7168 45.925 53.1668C45.375 52.6168 44.7333 52.3418 44 52.3418C43.2666 52.3418 42.625 52.6168 42.075 53.1668C41.525 53.7168 41.25 54.3584 41.25 55.0918C41.25 55.8251 41.525 56.4668 42.075 57.0168C42.625 57.5668 43.2666 57.8418 44 57.8418Z"
                                fill="#FFD600"
                            />
                        </g>
                    </svg>
                    <p>Are you sure you want to {action === "accept" ? "Accept" : "Decline"} selected {ids.length} accounts?</p>
                </div>
                <div className="bottom">
                    <div className="action-cont">
                        <button      className='accept' onClick={action === "accept" ? handleAccept : handleDecline}>
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
                            Accept
                            </button>

                        <button  className='decline' onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default BulkConfirmationModal;