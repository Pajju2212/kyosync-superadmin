import React, { useContext, useEffect, useState } from 'react';
import { Button, DatePicker, Modal, Table } from 'antd';
import "./_index.scss";
import image from "../../assets/images/Certi.png"
import ModalContext from '../../context/ModalProvider';
import { AdminService } from '../../services/AdminService';
import { toast } from 'react-toastify';

const SinglePaymentDetails = ({ isModalOpen, handleCancel }) => {
    const {selectedRequest} = useContext(ModalContext);

    // const handleAccept = async () => {
    //     if(selectedRequest){
    //         const response = await AdminService.approveRequest([selectedRequest.id]);
    //         if(response){
    //             toast.success("Accepted Request")
    //             handleCancel();
    //         }
    //     }
        
    // };
    
    // const handleDecline = async () => {
    //     if(selectedRequest){
    //         const response = await AdminService.declineRequest([selectedRequest.id]);
    //         if(response){
    //             toast.success("Declined Request")
    //             handleCancel();
    //         }
    //     }
    // }

    useEffect(()=>{
        console.log(selectedRequest)
    },[isModalOpen])
    
    const data = [
        {
            key: '1',
            id:"#2R4C9",
            date: '11/08/23',
            time: "9.30AM",
            type: 'ORDER',
            amount:"$23.00",
            revenue:"$1.25"
          },
          {
            key: '1',
            id:"#2R4C9",
            date: '11/08/23',
            time: "9.30AM",
            type: 'ORDER',
            amount:"$23.00",
            revenue:"$1.25"
          },
          {
            key: '1',
            id:"#2R4C9",
            date: '11/08/23',
            time: "9.30AM",
            type: 'ORDER',
            amount:"$23.00",
            revenue:"$1.25"
          },
          {
            key: '1',
            id:"#2R4C9",
            date: '11/08/23',
            time: "9.30AM",
            type: 'ORDER',
            amount:"$23.00",
            revenue:"$1.25"
          },
          {
            key: '1',
            id:"#2R4C9",
            date: '11/08/23',
            time: "9.30AM",
            type: 'ORDER',
            amount:"$23.00",
            revenue:"$1.25"
          },
          {
            key: '1',
            id:"#2R4C9",
            date: '11/08/23',
            time: "9.30AM",
            type: 'ORDER',
            amount:"$23.00",
            revenue:"$1.25"
          },
          {
            key: '1',
            id:"#2R4C9",
            date: '11/08/23',
            time: "9.30AM",
            type: 'ORDER',
            amount:"$23.00",
            revenue:"$1.25"
          },
          {
            key: '1',
            id:"#2R4C9",
            date: '11/08/23',
            time: "9.30AM",
            type: 'ORDER',
            amount:"$23.00",
            revenue:"$1.25"
          },
          {
            key: '1',
            id:"#2R4C9",
            date: '11/08/23',
            time: "9.30AM",
            type: 'ORDER',
            amount:"$23.00",
            revenue:"$1.25"
          },
          {
            key: '1',
            id:"#2R4C9",
            date: '11/08/23',
            time: "9.30AM",
            type: 'ORDER',
            amount:"$23.00",
            revenue:"$1.25"
          },

    ]
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
          },
          {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
          },
          {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
          },
          {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
          },
          {
            title: 'Revenue',
            dataIndex: 'revenue',
            key: 'revenue',
          },
    ]

    return (
        <Modal open={isModalOpen} onCancel={handleCancel} centered={true} footer={null} width={"max-content"} closeIcon={true}>
            <div className="payment-details">
                <div className="left">
                    <div className="title">
                    KIKO Café
                    </div>
                    <div className="date-input">
                    <div className="date">12/10/2023</div> <p>to</p> <div className="today">Today</div>
                    </div>
                    <div className="table">
                        <Table columns={columns} dataSource={data} pagination={false}/>
                    </div>
                </div>  
                <div className="right">
                    <div className="top-top">
                    <div className="top">
                        <div className="title">Total Earnings $89,802.00</div>
                        <div className="item">Today total shop earnings <span>$4321.00</span></div>
                        <div className="item">Required release amount for today <span>$4021.42</span></div>
                    </div>
                    <div className="mid">
                        <div className="title">Account Details</div>
                        <div className="item">Bank name : Kookmin Bank(KB) </div>
                        <div className="item">Account owner : KIKO Café Group PVT LTD</div>
                        <div className="item">Account number : <span>760737-04-006609</span></div>
                        <div className="item">Contact Number : +82-02-571-2917</div>
                    </div>
                    </div>
                    

                    <div className="bottom">
                        <div className="msg">Settle-up today’s transfer amount of $4021.42</div>
                        <button className="transfer">
                        Mark as Transferred
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default SinglePaymentDetails;