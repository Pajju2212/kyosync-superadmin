import React, { useContext, useEffect, useRef, useState } from 'react'
import "./_index.scss"
import { Space, Table, Tag } from 'antd';
import SingleRequestModal from '../singleRequestModal';
import ModalContext from '../../context/ModalProvider';
import { AdminService } from '../../services/AdminService';
import { toast } from 'react-toastify';
import BulkConfirmationModal from '../bulkConfirmationModal';
import { ExportAsCsv, ExportAsPdf, ExportAsExcel } from 'react-export-table';


const data = [
  {
    id: 1,
    userId: null,
    businessName: "CaravanFresh",
    ownerName: "Kavindu",
    nic: "971033916v",
    businessAddress: "Dalugama,Kelaniya",
    companyRegistration: "123654789q",
    businessRegistration: "789465132w",
    businessEmail: "Caravan@example.com",
    mobileNumber: "0722323341",
    businessWebsite: "www.Caravan.lk",
    status: 1,
    emailVerified: false,
    mobileVerified: false
  },
  {
    id: 1,
    userId: null,
    businessName: "CaravanFresh",
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
]
const FILTER_MODE = {
  ACCEPTED: 2,
  DECLINED: 3,
  PENDING: 1,
  NONE: 0,
}

const TABLE_COLUMNS = {
  BUSINESS_NAME: "businessName",
  BUSINESS_ADDRESS: "businessAddress",
  COMPANY_REG_NO: "companyRegistration",
  BUSINESS_REG_NO: "businessRegistration",
  BUSINESS_EMAIL: "businessEmail",
  BUSINESS_CONTACT: "mobileNumber",
}

const AdminManagement = () => {
  const optionPanel = useRef(null)
  const [optionModalOpen, setOptionModalOpen] = useState(false)
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false)
  const [bulkAction, setBulkAction] = useState('')
  const [windowInnerHeight, setWindowInnerHeight] = useState()
  const { isModalOpen, setIsModalOpen, selectedRequest, setSelectedRequest } = useContext(ModalContext);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [numberOfItemPerPage, setNumberOfItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(0);
  const [selectionType, setSelectionType] = useState('checkbox');
  const [filter, setFilter] = useState(FILTER_MODE.NONE);
  const [adminData, setAdminData] = useState();
  const [adminDataFiltered, setAdminDataFiltered] = useState([]);
  const [bulkSelectIds, setBulkSelectIds] = useState([]);
  const [activeColumnKeys, setActiveColumnKeys] = useState([0, 1, 2, 3, 4, 5, 6, 7])

  const [columns, setColumns] = useState({
    0: {
      title: 'NO',
      dataIndex: 'id',
      width: "min-content",
      display: true,
    },
    1: {
      title: 'Business Name',
      dataIndex: TABLE_COLUMNS.BUSINESS_NAME,
      display: true,
    },
    2: {
      title: 'Business Address',
      dataIndex: TABLE_COLUMNS.BUSINESS_ADDRESS,
      render: (text, record, index) => {
        return (
          <>{text} <div className="clipboard" onClick={() => { navigator.clipboard.writeText(text); toast.success("Text Copied") }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
            >
              <mask
                id="mask0_789_745"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x={0}
                y={0}
                width={24}
                height={24}
              >
                <rect width={24} height={24} fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_789_745)">
                <path
                  d="M9.05771 17.5C8.55258 17.5 8.12502 17.325 7.77504 16.975C7.42504 16.625 7.25004 16.1974 7.25004 15.6923V4.3077C7.25004 3.80257 7.42504 3.375 7.77504 3.025C8.12502 2.675 8.55258 2.5 9.05771 2.5H17.4423C17.9474 2.5 18.375 2.675 18.725 3.025C19.075 3.375 19.25 3.80257 19.25 4.3077V15.6923C19.25 16.1974 19.075 16.625 18.725 16.975C18.375 17.325 17.9474 17.5 17.4423 17.5H9.05771ZM9.05771 16H17.4423C17.5192 16 17.5897 15.9679 17.6538 15.9038C17.7179 15.8397 17.75 15.7692 17.75 15.6923V4.3077C17.75 4.23077 17.7179 4.16024 17.6538 4.09613C17.5897 4.03203 17.5192 3.99998 17.4423 3.99998H9.05771C8.98078 3.99998 8.91026 4.03203 8.84616 4.09613C8.78204 4.16024 8.74999 4.23077 8.74999 4.3077V15.6923C8.74999 15.7692 8.78204 15.8397 8.84616 15.9038C8.91026 15.9679 8.98078 16 9.05771 16ZM5.55774 20.9999C5.05262 20.9999 4.62506 20.8249 4.27506 20.4749C3.92506 20.1249 3.75006 19.6973 3.75006 19.1922V7.05768C3.75006 6.84486 3.82185 6.66666 3.96544 6.52308C4.10904 6.37949 4.28724 6.3077 4.50004 6.3077C4.71285 6.3077 4.89106 6.37949 5.03466 6.52308C5.17824 6.66666 5.25004 6.84486 5.25004 7.05768V19.1922C5.25004 19.2692 5.28209 19.3397 5.34619 19.4038C5.4103 19.4679 5.48082 19.5 5.55774 19.5H14.6923C14.9051 19.5 15.0833 19.5717 15.2269 19.7153C15.3705 19.8589 15.4423 20.0371 15.4423 20.2499C15.4423 20.4627 15.3705 20.6409 15.2269 20.7845C15.0833 20.9281 14.9051 20.9999 14.6923 20.9999H5.55774Z"
                  fill="#1C1B1F"
                />
              </g>
            </svg>
          </div></>
        )
      },
      display: true
    },
    3: {
      title: 'Company Reg No',
      dataIndex: TABLE_COLUMNS.COMPANY_REG_NO,
      render: (text, record, index) => {
        return (
          <>{text} <div className="clipboard" onClick={() => { navigator.clipboard.writeText(text); toast.success("Text Copied") }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
            >
              <mask
                id="mask0_789_745"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x={0}
                y={0}
                width={24}
                height={24}
              >
                <rect width={24} height={24} fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_789_745)">
                <path
                  d="M9.05771 17.5C8.55258 17.5 8.12502 17.325 7.77504 16.975C7.42504 16.625 7.25004 16.1974 7.25004 15.6923V4.3077C7.25004 3.80257 7.42504 3.375 7.77504 3.025C8.12502 2.675 8.55258 2.5 9.05771 2.5H17.4423C17.9474 2.5 18.375 2.675 18.725 3.025C19.075 3.375 19.25 3.80257 19.25 4.3077V15.6923C19.25 16.1974 19.075 16.625 18.725 16.975C18.375 17.325 17.9474 17.5 17.4423 17.5H9.05771ZM9.05771 16H17.4423C17.5192 16 17.5897 15.9679 17.6538 15.9038C17.7179 15.8397 17.75 15.7692 17.75 15.6923V4.3077C17.75 4.23077 17.7179 4.16024 17.6538 4.09613C17.5897 4.03203 17.5192 3.99998 17.4423 3.99998H9.05771C8.98078 3.99998 8.91026 4.03203 8.84616 4.09613C8.78204 4.16024 8.74999 4.23077 8.74999 4.3077V15.6923C8.74999 15.7692 8.78204 15.8397 8.84616 15.9038C8.91026 15.9679 8.98078 16 9.05771 16ZM5.55774 20.9999C5.05262 20.9999 4.62506 20.8249 4.27506 20.4749C3.92506 20.1249 3.75006 19.6973 3.75006 19.1922V7.05768C3.75006 6.84486 3.82185 6.66666 3.96544 6.52308C4.10904 6.37949 4.28724 6.3077 4.50004 6.3077C4.71285 6.3077 4.89106 6.37949 5.03466 6.52308C5.17824 6.66666 5.25004 6.84486 5.25004 7.05768V19.1922C5.25004 19.2692 5.28209 19.3397 5.34619 19.4038C5.4103 19.4679 5.48082 19.5 5.55774 19.5H14.6923C14.9051 19.5 15.0833 19.5717 15.2269 19.7153C15.3705 19.8589 15.4423 20.0371 15.4423 20.2499C15.4423 20.4627 15.3705 20.6409 15.2269 20.7845C15.0833 20.9281 14.9051 20.9999 14.6923 20.9999H5.55774Z"
                  fill="#1C1B1F"
                />
              </g>
            </svg>
          </div></>
        )
      },
      display: true,
    },
    4: {
      title: 'Business Registration',
      dataIndex: TABLE_COLUMNS.BUSINESS_REG_NO,
      display: true,
      render: (text, record, index) => {
        return (
          <>{text} <a download={true} className="clipboard" href={`${text}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
            >
              <mask
                id="mask0_789_443"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x={0}
                y={0}
                width={24}
                height={24}
              >
                <rect width={24} height={24} fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_789_443)">
                <path
                  d="M12 15.4115C11.8795 15.4115 11.7673 15.3923 11.6634 15.3538C11.5596 15.3154 11.4609 15.2493 11.3673 15.1557L8.2577 12.0462C8.10898 11.8974 8.03559 11.7234 8.03753 11.5241C8.03944 11.3247 8.11283 11.1475 8.2577 10.9923C8.41283 10.8372 8.59103 10.7571 8.7923 10.752C8.99358 10.7468 9.17179 10.8218 9.32692 10.977L11.25 12.9V5.25C11.25 5.03718 11.3218 4.85898 11.4654 4.7154C11.609 4.5718 11.7872 4.5 12 4.5C12.2128 4.5 12.391 4.5718 12.5346 4.7154C12.6782 4.85898 12.7499 5.03718 12.7499 5.25V12.9L14.673 10.977C14.8217 10.8282 14.9983 10.7548 15.2028 10.7568C15.4073 10.7587 15.5871 10.8372 15.7422 10.9923C15.8871 11.1475 15.9621 11.3231 15.9672 11.5193C15.9724 11.7154 15.8974 11.891 15.7422 12.0462L12.6327 15.1557C12.5391 15.2493 12.4403 15.3154 12.3365 15.3538C12.2327 15.3923 12.1205 15.4115 12 15.4115ZM6.3077 19.5C5.80257 19.5 5.375 19.325 5.025 18.975C4.675 18.625 4.5 18.1974 4.5 17.6923V15.7307C4.5 15.5179 4.5718 15.3397 4.7154 15.1961C4.85898 15.0525 5.03718 14.9808 5.25 14.9808C5.46282 14.9808 5.64102 15.0525 5.7846 15.1961C5.92818 15.3397 5.99997 15.5179 5.99997 15.7307V17.6923C5.99997 17.7692 6.03202 17.8397 6.09612 17.9038C6.16024 17.9679 6.23077 18 6.3077 18H17.6922C17.7692 18 17.8397 17.9679 17.9038 17.9038C17.9679 17.8397 18 17.7692 18 17.6923V15.7307C18 15.5179 18.0718 15.3397 18.2154 15.1961C18.3589 15.0525 18.5371 14.9808 18.75 14.9808C18.9628 14.9808 19.141 15.0525 19.2845 15.1961C19.4281 15.3397 19.5 15.5179 19.5 15.7307V17.6923C19.5 18.1974 19.325 18.625 18.975 18.975C18.625 19.325 18.1974 19.5 17.6922 19.5H6.3077Z"
                  fill="#1C1B1F"
                />
              </g>
            </svg>
          </a></>
        )
      },
    },
    5: {
      title: 'Business Email',
      dataIndex: TABLE_COLUMNS.BUSINESS_EMAIL,
      render: (text, record, index) => {
        return (
          <>{text} <a className="clipboard" href={`mailto:${text}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
            >
              <mask
                id="mask0_789_765"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x={0}
                y={0}
                width={24}
                height={24}
              >
                <rect width={24} height={24} fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_789_765)">
                <path
                  d="M4.3077 19.5C3.80257 19.5 3.375 19.325 3.025 18.975C2.675 18.625 2.5 18.1974 2.5 17.6923V6.3077C2.5 5.80257 2.675 5.375 3.025 5.025C3.375 4.675 3.80257 4.5 4.3077 4.5H19.6923C20.1974 4.5 20.625 4.675 20.975 5.025C21.325 5.375 21.5 5.80257 21.5 6.3077V17.6923C21.5 18.1974 21.325 18.625 20.975 18.975C20.625 19.325 20.1974 19.5 19.6923 19.5H4.3077ZM20 7.44225L12.4865 12.2519C12.4096 12.2955 12.3301 12.3298 12.2481 12.3548C12.166 12.3798 12.0833 12.3923 12 12.3923C11.9166 12.3923 11.834 12.3798 11.7519 12.3548C11.6699 12.3298 11.5904 12.2955 11.5135 12.2519L3.99998 7.44225V17.6923C3.99998 17.782 4.02883 17.8557 4.08653 17.9134C4.14423 17.9711 4.21795 18 4.3077 18H19.6923C19.782 18 19.8557 17.9711 19.9134 17.9134C19.9711 17.8557 20 17.782 20 17.6923V7.44225ZM12 11L19.8461 5.99998H4.15383L12 11ZM3.99998 7.673V6.52978V6.55957V6.52785V7.673Z"
                  fill="#1C1B1F"
                />
              </g>
            </svg>

          </a></>
        )
      },
      display: true,
    },
    6: {
      title: 'Business Contact',
      dataIndex: TABLE_COLUMNS.BUSINESS_CONTACT,
      display: true,
      render: (text, record, index) => {
        return (
          <>{text} <a className="clipboard" href={`tel:${text}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
            >
              <mask
                id="mask0_789_293"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x={0}
                y={0}
                width={24}
                height={24}
              >
                <rect width={24} height={24} fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_789_293)">
                <path
                  d="M19.4403 20.5C17.5557 20.5 15.6625 20.0618 13.7606 19.1855C11.8586 18.3092 10.1112 17.073 8.51828 15.4769C6.92533 13.8807 5.69071 12.1333 4.81442 10.2346C3.93814 8.33588 3.5 6.44423 3.5 4.55963C3.5 4.25688 3.6 4.00458 3.8 3.80275C4 3.60092 4.25 3.5 4.55 3.5H7.8115C8.06407 3.5 8.28683 3.58238 8.47977 3.74713C8.67272 3.91188 8.79548 4.1154 8.84803 4.3577L9.4211 7.29998C9.46085 7.57306 9.45252 7.80768 9.3961 8.00383C9.3397 8.19998 9.23842 8.36472 9.09225 8.49805L6.78265 10.7461C7.15445 11.4269 7.57913 12.0708 8.0567 12.6779C8.53427 13.2849 9.05125 13.8647 9.60765 14.4173C10.1564 14.966 10.7397 15.4756 11.3577 15.9462C11.9756 16.4167 12.6429 16.8545 13.3596 17.2596L15.6038 14.9962C15.7602 14.8333 15.9497 14.7192 16.1721 14.6539C16.3945 14.5885 16.6256 14.5724 16.8654 14.6058L19.6423 15.1712C19.8948 15.2378 20.1009 15.3667 20.2605 15.5577C20.4201 15.7487 20.5 15.9654 20.5 16.2077V19.45C20.5 19.75 20.399 20 20.1972 20.2C19.9954 20.4 19.7431 20.5 19.4403 20.5ZM6.07305 9.32693L7.85768 7.61923C7.88973 7.59358 7.91056 7.55832 7.92018 7.51345C7.92979 7.46857 7.92819 7.4269 7.91538 7.38845L7.48075 5.15383C7.46793 5.10254 7.4455 5.06408 7.41345 5.03845C7.3814 5.0128 7.33973 4.99998 7.28845 4.99998H5.14997C5.11152 4.99998 5.07948 5.0128 5.05383 5.03845C5.02818 5.06408 5.01535 5.09613 5.01535 5.1346C5.06663 5.81793 5.17849 6.51217 5.35092 7.2173C5.52337 7.92243 5.76408 8.62564 6.07305 9.32693ZM14.773 17.9692C15.4359 18.2782 16.1272 18.5144 16.8471 18.6779C17.567 18.8413 18.2397 18.9384 18.8654 18.9692C18.9038 18.9692 18.9359 18.9564 18.9615 18.9308C18.9872 18.9051 19 18.873 19 18.8346V16.7308C19 16.6795 18.9872 16.6378 18.9615 16.6057C18.9359 16.5737 18.8974 16.5512 18.8461 16.5384L16.7461 16.1115C16.7077 16.0987 16.674 16.0971 16.6452 16.1067C16.6163 16.1163 16.5859 16.1372 16.5538 16.1692L14.773 17.9692Z"
                  fill="#1C1B1F"
                />
              </g>
            </svg>

          </a></>
        )
      },
    },
    7: {
      title: 'Status',
      dataIndex: 'status',
      render: (value) => (<div className='status'>{value === 1 ?
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
        >
          <mask
            id="mask0_789_303"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x={0}
            y={0}
            width={24}
            height={24}
          >
            <rect width={24} height={24} fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_789_303)">
            <path
              d="M6.99888 13.25C7.34578 13.25 7.64102 13.1285 7.88461 12.8857C8.12819 12.6429 8.24998 12.348 8.24998 12.0011C8.24998 11.6542 8.12856 11.359 7.88573 11.1154C7.6429 10.8718 7.34803 10.75 7.00113 10.75C6.65423 10.75 6.35899 10.8714 6.11541 11.1143C5.87182 11.3571 5.75003 11.652 5.75003 11.9989C5.75003 12.3458 5.87145 12.641 6.11428 12.8846C6.35711 13.1282 6.65198 13.25 6.99888 13.25ZM11.9989 13.25C12.3458 13.25 12.641 13.1285 12.8846 12.8857C13.1282 12.6429 13.25 12.348 13.25 12.0011C13.25 11.6542 13.1286 11.359 12.8857 11.1154C12.6429 10.8718 12.348 10.75 12.0011 10.75C11.6542 10.75 11.359 10.8714 11.1154 11.1143C10.8718 11.3571 10.75 11.652 10.75 11.9989C10.75 12.3458 10.8714 12.641 11.1143 12.8846C11.3571 13.1282 11.652 13.25 11.9989 13.25ZM16.9989 13.25C17.3458 13.25 17.641 13.1285 17.8846 12.8857C18.1282 12.6429 18.25 12.348 18.25 12.0011C18.25 11.6542 18.1286 11.359 17.8857 11.1154C17.6429 10.8718 17.348 10.75 17.0011 10.75C16.6542 10.75 16.359 10.8714 16.1154 11.1143C15.8718 11.3571 15.75 11.652 15.75 11.9989C15.75 12.3458 15.8714 12.641 16.1143 12.8846C16.3571 13.1282 16.652 13.25 16.9989 13.25ZM12.0017 21.5C10.6877 21.5 9.45271 21.2506 8.29658 20.752C7.14043 20.2533 6.13475 19.5765 5.27953 18.7217C4.4243 17.8669 3.74724 16.8616 3.24836 15.706C2.74947 14.5504 2.50003 13.3156 2.50003 12.0017C2.50003 10.6877 2.74936 9.45268 3.24803 8.29655C3.7467 7.1404 4.42345 6.13472 5.27828 5.2795C6.13313 4.42427 7.13837 3.74721 8.29401 3.24833C9.44962 2.74944 10.6844 2.5 11.9983 2.5C13.3123 2.5 14.5473 2.74933 15.7034 3.248C16.8596 3.74667 17.8653 4.42342 18.7205 5.27825C19.5757 6.1331 20.2528 7.13834 20.7517 8.29398C21.2505 9.44959 21.5 10.6844 21.5 11.9983C21.5 13.3122 21.2506 14.5473 20.752 15.7034C20.2533 16.8596 19.5766 17.8652 18.7217 18.7205C17.8669 19.5757 16.8616 20.2527 15.706 20.7516C14.5504 21.2505 13.3156 21.5 12.0017 21.5ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76664 19.225 7.87498 17.675 6.32498C16.125 4.77498 14.2333 3.99998 12 3.99998C9.76667 3.99998 7.87501 4.77498 6.32501 6.32498C4.77501 7.87498 4.00001 9.76664 4.00001 12C4.00001 14.2333 4.77501 16.125 6.32501 17.675C7.87501 19.225 9.76667 20 12 20Z"
              fill="#1C1B1F"
            />
          </g>
        </svg>
        : value === 2 ?
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={25}
            height={24}
            viewBox="0 0 25 24"
            fill="none"
          >
            <mask
              id="mask0_789_497"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x={0}
              y={0}
              width={25}
              height={24}
            >
              <rect x="0.423828" width={24} height={24} fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_789_497)">
              <path
                d="M11.0046 14.1462L8.68151 11.8231C8.54306 11.6846 8.36903 11.6138 8.15941 11.6106C7.94979 11.6074 7.77255 11.6782 7.62768 11.8231C7.48282 11.9679 7.41038 12.1436 7.41038 12.35C7.41038 12.5564 7.48282 12.732 7.62768 12.8769L10.3719 15.6211C10.5527 15.8019 10.7636 15.8923 11.0046 15.8923C11.2456 15.8923 11.4565 15.8019 11.6373 15.6211L17.2007 10.0577C17.3392 9.9192 17.41 9.74517 17.4132 9.53555C17.4165 9.32593 17.3456 9.14869 17.2007 9.00383C17.0559 8.85896 16.8802 8.78653 16.6738 8.78653C16.4674 8.78653 16.2918 8.85896 16.1469 9.00383L11.0046 14.1462ZM12.4255 21.5C11.1116 21.5 9.87654 21.2506 8.72041 20.752C7.56426 20.2533 6.55858 19.5765 5.70336 18.7217C4.84813 17.8669 4.17107 16.8616 3.67218 15.706C3.1733 14.5504 2.92386 13.3156 2.92386 12.0017C2.92386 10.6877 3.17319 9.45268 3.67186 8.29655C4.17053 7.1404 4.84728 6.13472 5.70211 5.2795C6.55696 4.42427 7.5622 3.74721 8.71783 3.24833C9.87345 2.74944 11.1082 2.5 12.4222 2.5C13.7361 2.5 14.9711 2.74933 16.1273 3.248C17.2834 3.74667 18.2891 4.42342 19.1443 5.27825C19.9995 6.1331 20.6766 7.13834 21.1755 8.29398C21.6744 9.44959 21.9238 10.6844 21.9238 11.9983C21.9238 13.3122 21.6745 14.5473 21.1758 15.7034C20.6771 16.8596 20.0004 17.8652 19.1456 18.7205C18.2907 19.5757 17.2855 20.2527 16.1298 20.7516C14.9742 21.2505 13.7394 21.5 12.4255 21.5ZM12.4238 20C14.6572 20 16.5488 19.225 18.0988 17.675C19.6488 16.125 20.4238 14.2333 20.4238 12C20.4238 9.76664 19.6488 7.87498 18.0988 6.32498C16.5488 4.77498 14.6572 3.99998 12.4238 3.99998C10.1905 3.99998 8.29883 4.77498 6.74883 6.32498C5.19883 7.87498 4.42383 9.76664 4.42383 12C4.42383 14.2333 5.19883 16.125 6.74883 17.675C8.29883 19.225 10.1905 20 12.4238 20Z"
                fill="#1C1B1F"
              />
            </g>
          </svg> :
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10 11.0538L13.0731 14.1269C13.2116 14.2653 13.3856 14.3362 13.5952 14.3394C13.8048 14.3426 13.982 14.2718 14.1269 14.1269C14.2718 13.982 14.3442 13.8064 14.3442 13.6C14.3442 13.3936 14.2718 13.2179 14.1269 13.0731L11.0538 9.99998L14.1269 6.92688C14.2654 6.78843 14.3362 6.61439 14.3394 6.40478C14.3426 6.19518 14.2718 6.01794 14.1269 5.87308C13.982 5.72819 13.8064 5.65575 13.6 5.65575C13.3936 5.65575 13.218 5.72819 13.0731 5.87308L10 8.94615L6.92691 5.87308C6.78846 5.73461 6.61442 5.66378 6.40481 5.66058C6.19521 5.65736 6.01797 5.72819 5.87311 5.87308C5.72822 6.01794 5.65578 6.19358 5.65578 6.39998C5.65578 6.60638 5.72822 6.78201 5.87311 6.92688L8.94618 9.99998L5.87311 13.0731C5.73464 13.2115 5.66381 13.3856 5.66061 13.5952C5.65739 13.8048 5.72822 13.982 5.87311 14.1269C6.01797 14.2718 6.19361 14.3442 6.40001 14.3442C6.60641 14.3442 6.78204 14.2718 6.92691 14.1269L10 11.0538ZM10.0017 19.5C8.68775 19.5 7.45271 19.2506 6.29658 18.752C5.14043 18.2533 4.13475 17.5765 3.27953 16.7217C2.4243 15.8669 1.74724 14.8616 1.24836 13.706C0.749472 12.5504 0.500031 11.3156 0.500031 10.0017C0.500031 8.68772 0.749364 7.45268 1.24803 6.29655C1.7467 5.1404 2.42345 4.13472 3.27828 3.2795C4.13313 2.42427 5.13837 1.74721 6.29401 1.24833C7.44962 0.749443 8.6844 0.5 9.99833 0.5C11.3123 0.5 12.5473 0.749334 13.7034 1.248C14.8596 1.74667 15.8653 2.42342 16.7205 3.27825C17.5757 4.1331 18.2528 5.13834 18.7517 6.29398C19.2505 7.44959 19.5 8.68437 19.5 9.9983C19.5 11.3122 19.2506 12.5473 18.752 13.7034C18.2533 14.8596 17.5766 15.8652 16.7217 16.7205C15.8669 17.5757 14.8616 18.2527 13.706 18.7516C12.5504 19.2505 11.3156 19.5 10.0017 19.5ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 9.99998C18 7.76664 17.225 5.87498 15.675 4.32498C14.125 2.77498 12.2333 1.99998 10 1.99998C7.76667 1.99998 5.87501 2.77498 4.32501 4.32498C2.77501 5.87498 2.00001 7.76664 2.00001 9.99998C2.00001 12.2333 2.77501 14.125 4.32501 15.675C5.87501 17.225 7.76667 18 10 18Z"
              fill="#1C1B1F"
            />
          </svg>

      } {value === 1 ? "Pending" : value === 2 ? "Accepted" : "Declined"}</div>),
      display: true,
    },
    8: {
      title: '',
      dataIndex: '',
      render: (value, record, index) => (<button onClick={() => {
        setSelectedRequest(record);
        setIsModalOpen(true)
      }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
        >
          <mask
            id="mask0_789_309"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x={0}
            y={0}
            width={24}
            height={24}
          >
            <rect width={24} height={24} fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_789_309)">
            <path
              d="M6 14C5.45 14 4.97917 13.8042 4.5875 13.4125C4.19583 13.0208 4 12.55 4 12C4 11.45 4.19583 10.9792 4.5875 10.5875C4.97917 10.1958 5.45 10 6 10C6.55 10 7.02083 10.1958 7.4125 10.5875C7.80417 10.9792 8 11.45 8 12C8 12.55 7.80417 13.0208 7.4125 13.4125C7.02083 13.8042 6.55 14 6 14ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14ZM18 14C17.45 14 16.9792 13.8042 16.5875 13.4125C16.1958 13.0208 16 12.55 16 12C16 11.45 16.1958 10.9792 16.5875 10.5875C16.9792 10.1958 17.45 10 18 10C18.55 10 19.0208 10.1958 19.4125 10.5875C19.8042 10.9792 20 11.45 20 12C20 12.55 19.8042 13.0208 19.4125 13.4125C19.0208 13.8042 18.55 14 18 14Z"
              fill="#007AFF"
            />
          </g>
        </svg>

      </button>),
      display: true,
    },
  })
  function paginateArray(array, pageSize) {
    const paginatedArray = [];
    for (let i = 0; i < array.length; i += pageSize) {
      paginatedArray.push(array.slice(i, i + pageSize));
    }
    return paginatedArray;
  }
  const [paginatedArray, setPaginatedArray] = useState(paginateArray(adminDataFiltered, numberOfItemPerPage))
  function getTableColumns() {
    return Object.keys(columns).map(key => {
      return columns[key]
    }).filter(item => (item.display))
  }

  useEffect(() => {
    optionPanel.current.style.height = `${(windowInnerHeight - 20) - optionPanel?.current.getBoundingClientRect().top}px`
  }, [optionPanel, windowInnerHeight])

  useEffect(() => {
    setWindowInnerHeight(window.innerHeight)
    const setInnerHeight = () => {
      setWindowInnerHeight(window.innerHeight)
    }
    window.addEventListener("resize", setInnerHeight)
    return () => {
      window.removeEventListener("resize", setInnerHeight)
    }
  }, [optionModalOpen])

  useEffect(() => {
    if (!isModalOpen) {
      fetchData();
    }
  }, [isModalOpen])
  useEffect(() => {
    if (!isBulkModalOpen) {
      fetchData();
    }
  }, [isBulkModalOpen])

  useEffect(() => {
    setPaginatedArray(paginateArray(adminDataFiltered, numberOfItemPerPage))
  }, [adminDataFiltered])

  const fetchData = async () => {
    const data = await AdminService.getAll()
    setAdminData(data);
    setAdminDataFiltered(data);
    setPaginatedArray(paginateArray(data, numberOfItemPerPage))
  }
  const rowSelection = {
    onChange: (key, selectedRows) => {
      setSelectedQuantity(selectedRows.length)
      setBulkSelectIds(selectedRows.map(item => (item.id)));
      console.log(bulkSelectIds)
    }
  };

  useEffect(() => {
    optionPanel.current.querySelectorAll('.col-item input[type="checkbox"]').forEach(element => {
      if (element.getAttribute("data-turned") === "true") {
        element.checked = true;
      } else {
        element.checked = false;
      }
    });
  }, [optionPanel])

  const handleFilterChange = (value) => {
    setFilter(value);
    let status = 0;
    switch (value) {
      case FILTER_MODE.NONE:
        status = 0
        break;
      case FILTER_MODE.ACCEPTED:
        status = 2
        break;
      case FILTER_MODE.DECLINED:
        status = 3
        break;
      case FILTER_MODE.PENDING:
        status = 1
        break;

      default:
        break;
    }

    if (status === 0) {
      setAdminDataFiltered(adminData)
    } else {
      setAdminDataFiltered(adminData.filter(item => (item.status === status)))
    }
  }

  const updateTableView = () => {
    let tempData = {}
    console.log(Object.keys(columns).map(key => {
      tempData = { ...tempData, [key]: { ...columns[key], display: activeColumnKeys.includes(key * 1) } }
    }))
    setColumns(tempData)
  };

  const handleViewChange = (event) => {
    var checked = event.target.getAttribute("data-turned")
    switch (event.target.name) {
      case TABLE_COLUMNS.BUSINESS_NAME:
        if (checked === "true") {
          setActiveColumnKeys((prev) => (prev.filter((item) => (item !== 1))))
          event.target.setAttribute("data-turned", false)
        } else {
          setActiveColumnKeys((prev) => ([...prev, 1]))
        }
        break;

      case TABLE_COLUMNS.BUSINESS_ADDRESS:
        if (checked === "true") {
          setActiveColumnKeys((prev) => (prev.filter((item) => (item !== 2))))
          event.target.setAttribute("data-turned", false)
        } else {
          setActiveColumnKeys((prev) => ([...prev, 2]))
        }
        break;

      case TABLE_COLUMNS.COMPANY_REG_NO:
        if (checked === "true") {
          setActiveColumnKeys((prev) => (prev.filter((item) => (item !== 3))))
          event.target.setAttribute("data-turned", false)
        } else {
          setActiveColumnKeys((prev) => ([...prev, 3]))
        }
        break;

      case TABLE_COLUMNS.BUSINESS_REG_NO:
        if (checked === "true") {
          setActiveColumnKeys((prev) => (prev.filter((item) => (item !== 4))))
          event.target.setAttribute("data-turned", false)
        } else {
          setActiveColumnKeys((prev) => ([...prev, 4]))
        }
        break;

      case TABLE_COLUMNS.BUSINESS_EMAIL:
        if (checked === "true") {
          setActiveColumnKeys((prev) => (prev.filter((item) => (item !== 5))))
          event.target.setAttribute("data-turned", false)
        } else {
          setActiveColumnKeys((prev) => ([...prev, 5]))
        }
        break;

      case TABLE_COLUMNS.BUSINESS_CONTACT:
        if (checked === "true") {
          setActiveColumnKeys((prev) => (prev.filter((item) => (item !== 6))))
          event.target.setAttribute("data-turned", false)
        } else {
          setActiveColumnKeys((prev) => ([...prev, 6]))
        }
        break;

      default:
        break;
    }
  }

  const handleBulkAccept = () => {
    setBulkAction('accept')
    setIsBulkModalOpen(true)
  }
  const handleBulkDecline = () => {
    setBulkAction('decline')
    setIsBulkModalOpen(true)
  }

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    setAdminDataFiltered(adminData.filter(item => {
      const row = `${item.id} ${item.businessName} ${item.ownerName} ${item.nic} ${item.businessAddress} ${item.companyRegistration} ${item.companyRegistration} ${item.businessEmail} ${item.mobileNumber}`.toLowerCase();
      if (filter === FILTER_MODE.NONE) {
        if (row.includes(searchTerm)) {
          return true;
        } else {
          return false
        }
      } else {
        if (row.includes(searchTerm) && item.status === filter) {
          return true
        } else {
          return false
        }
      }
    }))
  }

 
  return (
    <div className="adminManage">
      <div className="title-container">
        <h1><b>Admin Management</b></h1>
      </div>
      <BulkConfirmationModal ids={bulkSelectIds} action={bulkAction} isModalOpen={isBulkModalOpen} handleCancel={() => setIsBulkModalOpen(false)} />
      <div className="table-container">
        <div className="filter-row">
          <div className="selected-number">Selected : {selectedQuantity !== 0 ? selectedQuantity : "None"}</div>
          <div className="filter-inputs">
            <div className='search-container'> <div className="search-icon">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            >
            <mask
                id="mask0_789_732"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x={0}
                y={0}
                width={24}
                height={24}
            >
                <rect width={24} height={24} fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_789_732)">
                <path
                d="M9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.3 18.9C20.4833 19.0833 20.575 19.3167 20.575 19.6C20.575 19.8833 20.4833 20.1167 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z"
                fill="black"
                />
            </g>
            </svg>

            </div>
            <input type="text" className="searchBar" placeholder='Search Business Name or Registration Number' onChange={handleSearch}  /></div>
            
            <button onClick={() => setOptionModalOpen((prev) => (!prev))} >
              {optionModalOpen ? <svg
                xmlns="http://www.w3.org/2000/svg"
                width={63}
                height={61}
                viewBox="0 0 63 61"
                fill="none"
              >
                <rect width={63} height={61} rx={15} fill="#007AFF" />
                <mask
                  id="mask0_789_735"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x={19}
                  y={18}
                  width={25}
                  height={25}
                >
                  <rect x="19.7861" y="18.6406" width={24} height={24} fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_789_735)">
                  <path
                    d="M31.7862 32.0404L26.8862 36.9404C26.7028 37.1238 26.4695 37.2154 26.1862 37.2154C25.9028 37.2154 25.6695 37.1238 25.4862 36.9404C25.3028 36.7571 25.2112 36.5238 25.2112 36.2404C25.2112 35.9571 25.3028 35.7238 25.4862 35.5404L30.3862 30.6404L25.4862 25.7404C25.3028 25.5571 25.2112 25.3238 25.2112 25.0404C25.2112 24.7571 25.3028 24.5238 25.4862 24.3404C25.6695 24.1571 25.9028 24.0654 26.1862 24.0654C26.4695 24.0654 26.7028 24.1571 26.8862 24.3404L31.7862 29.2404L36.6862 24.3404C36.8695 24.1571 37.1028 24.0654 37.3862 24.0654C37.6695 24.0654 37.9028 24.1571 38.0862 24.3404C38.2695 24.5238 38.3612 24.7571 38.3612 25.0404C38.3612 25.3238 38.2695 25.5571 38.0862 25.7404L33.1862 30.6404L38.0862 35.5404C38.2695 35.7238 38.3612 35.9571 38.3612 36.2404C38.3612 36.5238 38.2695 36.7571 38.0862 36.9404C37.9028 37.1238 37.6695 37.2154 37.3862 37.2154C37.1028 37.2154 36.8695 37.1238 36.6862 36.9404L31.7862 32.0404Z"
                    fill="white"
                  />
                </g>
              </svg> : <svg
                xmlns="http://www.w3.org/2000/svg"
                width={63}
                height={61}
                viewBox="0 0 63 61"
                fill="none"
              >
                <rect width={63} height={61} rx={15} fill="#007AFF" id='option-trigger' />
                <mask
                  id="mask0_789_268"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x={19}
                  y={18}
                  width={25}
                  height={25}
                >
                  <rect x="19.7861" y="18.6406" width={24} height={24} fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_789_268)">
                  <path
                    d="M25.7861 32.6406C25.2361 32.6406 24.7653 32.4448 24.3736 32.0531C23.982 31.6615 23.7861 31.1906 23.7861 30.6406C23.7861 30.0906 23.982 29.6198 24.3736 29.2281C24.7653 28.8365 25.2361 28.6406 25.7861 28.6406C26.3361 28.6406 26.807 28.8365 27.1986 29.2281C27.5903 29.6198 27.7861 30.0906 27.7861 30.6406C27.7861 31.1906 27.5903 31.6615 27.1986 32.0531C26.807 32.4448 26.3361 32.6406 25.7861 32.6406ZM31.7861 32.6406C31.2361 32.6406 30.7653 32.4448 30.3736 32.0531C29.982 31.6615 29.7861 31.1906 29.7861 30.6406C29.7861 30.0906 29.982 29.6198 30.3736 29.2281C30.7653 28.8365 31.2361 28.6406 31.7861 28.6406C32.3361 28.6406 32.807 28.8365 33.1986 29.2281C33.5903 29.6198 33.7861 30.0906 33.7861 30.6406C33.7861 31.1906 33.5903 31.6615 33.1986 32.0531C32.807 32.4448 32.3361 32.6406 31.7861 32.6406ZM37.7861 32.6406C37.2361 32.6406 36.7653 32.4448 36.3736 32.0531C35.982 31.6615 35.7861 31.1906 35.7861 30.6406C35.7861 30.0906 35.982 29.6198 36.3736 29.2281C36.7653 28.8365 37.2361 28.6406 37.7861 28.6406C38.3361 28.6406 38.807 28.8365 39.1986 29.2281C39.5903 29.6198 39.7861 30.0906 39.7861 30.6406C39.7861 31.1906 39.5903 31.6615 39.1986 32.0531C38.807 32.4448 38.3361 32.6406 37.7861 32.6406Z"
                    fill="white"
                  />
                </g>
              </svg>}
            </button>
          </div>
          <div ref={optionPanel} className={`options ${optionModalOpen ? "active" : ""}`}>
            <div className="sect">
              <h3>Select Download Format</h3>
              <div className="btn-grp">
                  {/* FIX: Plain buttons only, no libraries */}
                  <button onClick={()=>toast.info("Excel Download")}>.xlsx</button>
                  <button onClick={()=>toast.info("PDF Download")}>.pdf</button>
                  <button onClick={()=>toast.info("CSV Download")}>.csv</button>
              </div>
            </div>
            
            <div className="sect">
              <h3>Select Filter Mode</h3>
              <div className="btn-grp">
                <button className={filter === FILTER_MODE.ACCEPTED ? "active" : ""} onClick={() => handleFilterChange(FILTER_MODE.ACCEPTED)}>Accepted Requests</button>
                <button className={filter === FILTER_MODE.DECLINED ? "active" : ""} onClick={() => handleFilterChange(FILTER_MODE.DECLINED)}>Declined Requests</button>
                <button className={filter === FILTER_MODE.PENDING ? "active" : ""} onClick={() => handleFilterChange(FILTER_MODE.PENDING)}>Pending Requests</button>
                <button className={filter === FILTER_MODE.NONE ? "active" : ""} onClick={() => handleFilterChange(FILTER_MODE.NONE)}>Remove Filter</button>
              </div>
            </div>
            
            <div className="sect">
                <h3>Edit Table View</h3>
                <div className="btn-grp">
                    <button onClick={updateTableView}>Update Table</button>
                </div>
            </div>
          </div>
        </div>

        <div className="tableadmin">
          <Table
            id='table-to-xls'
            key={currentPage}
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={getTableColumns()}
            dataSource={paginatedArray[currentPage]?.map((elem, index) => ({ key: index, ...elem }))}
            pagination={false}
          />
        </div>

        <div className="bottom-row">
          <div className="a"></div>
          <div className="pagination-container">
            <button disabled={currentPage === 0} className="prev-btn" onClick={() => setCurrentPage((prev) => (prev - 1))}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                <path d="M18 11.5L13 16.5L18 21.5" stroke="#999999" />
                <rect x="0.5" y="1" width="31" height="31" rx="3.5" stroke="#D1D1D6" />
              </svg>
            </button>
            {paginatedArray.map((item, index) => (
              <div className={`page ${index === currentPage ? "active" : ""}`} onClick={() => setCurrentPage(index)}>{index + 1}</div>
            ))}
            <button disabled={currentPage === paginatedArray.length - 1} className="next-btn" onClick={() => setCurrentPage((prev) => (prev + 1))}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                <path d="M14 21.5L19 16.5L14 11.5" stroke="#999999" />
                <rect x="31.5" y="32" width="31" height="31" rx="3.5" transform="rotate(-180 31.5 32)" stroke="#D1D1D6" />
              </svg>
            </button>
            <button className="end-btn" onClick={() => setCurrentPage(paginatedArray.length - 1)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                <path d="M11 21.5L16 16.5L11 11.5" stroke="#999999" />
                <path d="M15 21.5L20 16.5L15 11.5" stroke="#999999" />
                <rect x="31.5" y="32" width="31" height="31" rx="3.5" transform="rotate(-180 31.5 32)" stroke="#D1D1D6" />
              </svg>
            </button>
          </div>
          <div className="action-btn-container">
            <button className='accept' disabled={selectedQuantity === 0} onClick={handleBulkAccept}>
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

            <button className='decline' disabled={selectedQuantity === 0} onClick={handleBulkDecline}>
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
  )
}

export default AdminManagement