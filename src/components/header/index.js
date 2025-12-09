import React, { useContext, useState } from 'react'
import "./index.scss"
import TabContext from '../../context/TabProvider'
import ModalContext from '../../context/ModalProvider';

const Header = () => {
  const { activeTab, setActiveTab } = useContext(TabContext);
  const {isModalOpen,setIsModalOpen,selectedRequest,setSelectedRequest} = useContext(ModalContext)
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [notificationItems, setNotificationItems] = useState([
    {
      id: 1,
      userId: null,
      businessName: "Caravan Fresh",
      ownerName: "Kavindu",
      nic: "971033916v",
      businessAddress: "Dalugama,Kelaniya",
      companyRegistration: "123654789q",
      businessRegistration: "789465132w",
      businessEmail: "Caravan@example.com",
      mobileNumber: "0722323341",
      businessWebsite: "www.Caravan.lk",
      status: 2,
      emailVerified: false,
      mobileVerified: false
    },
    {
      id: 2,
      userId: null,
      businessName: "Carava Fresh",
      ownerName: "Kavindu",
      nic: "971033916v",
      businessAddress: "Dalugama,Kelaniya",
      companyRegistration: "123654789q",
      businessRegistration: "789465132w",
      businessEmail: "Caravan@example.com",
      mobileNumber: "0722323341",
      businessWebsite: "www.Caravan.lk",
      status: 2,
      emailVerified: false,
      mobileVerified: false
    }
  ])


  const clearNotifications = ()=>{
    setNotificationItems([]);
  }

  const removeItem = (index)=>{
    setNotificationItems(notificationItems.filter((elem,index1)=>(index1 !== index)))
  }

  const onReview = (id)=>{
    setIsNotificationPanelOpen(false);
    setActiveTab("adminManagement");
    setSelectedRequest(id);
    setIsModalOpen(true); 
  }

  return (
    <div className="header">
      <div className="ham-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M6.66667 30H33.3333C34.25 30 35 29.25 35 28.3333C35 27.4167 34.25 26.6667 33.3333 26.6667H6.66667C5.75 26.6667 5 27.4167 5 28.3333C5 29.25 5.75 30 6.66667 30ZM6.66667 21.6667H33.3333C34.25 21.6667 35 20.9167 35 20C35 19.0833 34.25 18.3333 33.3333 18.3333H6.66667C5.75 18.3333 5 19.0833 5 20C5 20.9167 5.75 21.6667 6.66667 21.6667ZM5 11.6667C5 12.5833 5.75 13.3333 6.66667 13.3333H33.3333C34.25 13.3333 35 12.5833 35 11.6667C35 10.75 34.25 10 33.3333 10H6.66667C5.75 10 5 10.75 5 11.6667Z" fill="black" />
        </svg>
      </div>

      <div className="notification-icon" onClick={()=>setIsNotificationPanelOpen((prev)=>(!prev))}>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <mask id="mask0_753_1033" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
            <rect width="40" height="40" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_753_1033)">
            <path d="M6.66666 31.6666V28.8888H9.99999V16.5555C9.99999 14.2314 10.6898 12.155 12.0694 10.3263C13.4491 8.4976 15.2592 7.33325 17.5 6.83325V5.83325C17.5 5.13881 17.743 4.54853 18.2292 4.06242C18.7153 3.57631 19.3055 3.33325 20 3.33325C20.6944 3.33325 21.2847 3.57631 21.7708 4.06242C22.2569 4.54853 22.5 5.13881 22.5 5.83325V6.83325C24.7407 7.33325 26.5509 8.4976 27.9305 10.3263C29.3102 12.155 30 14.2314 30 16.5555V28.8888H33.3333V31.6666H6.66666ZM20 36.6666C19.0833 36.6666 18.2986 36.3402 17.6458 35.6874C16.993 35.0346 16.6667 34.2499 16.6667 33.3333H23.3333C23.3333 34.2499 23.0069 35.0346 22.3542 35.6874C21.7014 36.3402 20.9167 36.6666 20 36.6666ZM12.7777 28.8888H27.2222V16.5555C27.2222 14.5555 26.5185 12.8518 25.1111 11.4443C23.7037 10.0369 22 9.33325 20 9.33325C18 9.33325 16.2963 10.0369 14.8889 11.4443C13.4814 12.8518 12.7777 14.5555 12.7777 16.5555V28.8888Z" fill={isNotificationPanelOpen ? "#007AFF" :"black"} />
          </g>
        </svg>
      </div>

      <div className={`notification-panel ${isNotificationPanelOpen ? "active":""}`}>
        <div className="head">
          <p onClick={clearNotifications}>Clear all</p>
          <svg onClick={clearNotifications}
            xmlns="http://www.w3.org/2000/svg"
            width={40}
            height={40}
            viewBox="0 0 40 40"
            fill="none"
          >
            <mask
              id="mask0_753_1269"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x={0}
              y={0}
              width={40}
              height={40}
            >
              <rect width={40} height={40} fill="#1C1B1F" />
            </mask>
            <g mask="url(#mask0_753_1269)">
              <path
                d="M6.38887 28.3334C5.99537 28.3334 5.66551 28.1998 5.39929 27.9327C5.1331 27.6656 5 27.3346 5 26.9397C5 26.5448 5.1331 26.2154 5.39929 25.9515C5.66551 25.6876 5.99537 25.5557 6.38887 25.5557H26.9445C27.338 25.5557 27.6678 25.6892 27.934 25.9564C28.2002 26.2235 28.3333 26.5545 28.3333 26.9494C28.3333 27.3443 28.2002 27.6737 27.934 27.9376C27.6678 28.2015 27.338 28.3334 26.9445 28.3334H6.38887ZM9.72221 21.389C9.32871 21.389 8.99885 21.2554 8.73262 20.9882C8.46643 20.7211 8.33333 20.3901 8.33333 19.9952C8.33333 19.6003 8.46643 19.2709 8.73262 19.007C8.99885 18.7432 9.32871 18.6112 9.72221 18.6112H30.2778C30.6713 18.6112 31.0012 18.7448 31.2674 19.0119C31.5336 19.2791 31.6667 19.6101 31.6667 20.005C31.6667 20.3998 31.5336 20.7292 31.2674 20.9931C31.0012 21.257 30.6713 21.389 30.2778 21.389H9.72221ZM13.0555 14.4445C12.662 14.4445 12.3322 14.3109 12.066 14.0438C11.7998 13.7767 11.6667 13.4456 11.6667 13.0507C11.6667 12.6559 11.7998 12.3265 12.066 12.0626C12.3322 11.7987 12.662 11.6667 13.0555 11.6667H33.6111C34.0046 11.6667 34.3345 11.8003 34.6007 12.0675C34.8669 12.3346 35 12.6656 35 13.0605C35 13.4554 34.8669 13.7848 34.6007 14.0487C34.3345 14.3126 34.0046 14.4445 33.6111 14.4445H13.0555Z"
                fill="#1C1B1F"
              />
            </g>
          </svg>

        </div>
        <div className="body">
          {
            notificationItems.map((elem,index)=>(<NotificationItem key={index} name={elem.businessName} location={elem.businessAddress} onRemove={()=>removeItem(index)} onReview={()=>onReview(elem.id)}/>))
          }
        </div>
      </div>
    </div>
  )
}

const NotificationItem = ({name,location,onRemove,onReview}) => {
  const handleReview = ()=>{
    
  }
  return (
    <div className="request-item" >
            <div className="top">
              <h3>Admin Registration Request</h3>
              <button onClick={onRemove}><svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
              >
                <mask
                  id="mask0_753_1224"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x={0}
                  y={0}
                  width={24}
                  height={24}
                >
                  <rect width={24} height={24} fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_753_1224)">
                  <path
                    d="M12 13.4L7.10005 18.3C6.91672 18.4834 6.68338 18.575 6.40005 18.575C6.11672 18.575 5.88338 18.4834 5.70005 18.3C5.51672 18.1167 5.42505 17.8834 5.42505 17.6C5.42505 17.3167 5.51672 17.0834 5.70005 16.9L10.6 12L5.70005 7.10005C5.51672 6.91672 5.42505 6.68338 5.42505 6.40005C5.42505 6.11672 5.51672 5.88338 5.70005 5.70005C5.88338 5.51672 6.11672 5.42505 6.40005 5.42505C6.68338 5.42505 6.91672 5.51672 7.10005 5.70005L12 10.6L16.9 5.70005C17.0834 5.51672 17.3167 5.42505 17.6 5.42505C17.8834 5.42505 18.1167 5.51672 18.3 5.70005C18.4834 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4834 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4834 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4834 18.1167 18.3 18.3C18.1167 18.4834 17.8834 18.575 17.6 18.575C17.3167 18.575 17.0834 18.4834 16.9 18.3L12 13.4Z"
                    fill="#1C1B1F"
                  />
                </g>
              </svg>
              </button>
            </div>
            <div className="bottom">
              <div className="details">
                <h4 className="name">{name}</h4>
                <div className="location">{location}</div>
              </div>
              <button onClick={onReview}>Review</button>
            </div>
    </div>
  )
}

export default Header