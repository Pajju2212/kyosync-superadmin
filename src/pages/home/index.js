// src/pages/home/index.js
import React, { useContext } from "react"; // Removed unused imports
import "./index.scss";

// Components
import Header from "../../components/header";
import SideBar from "../../components/sidebar";
import Dashboard from "../../components/dashboard";
import AdminManagement from "../../components/adminManagement";
import PaymentManagement from "../../components/paymentManagement";
import Settings from "../../components/settings";
import SingleRequestModal from "../../components/singleRequestModal";
import SinglePaymentDetails from "../../components/singlePaymentDetails";

// Contexts & Hooks
import ModalContext from "../../context/ModalProvider";
import TabContext from "../../context/TabProvider";
import { SyncLoader } from "react-spinners";
import { useAxiosLoader } from "use-axios-loader";
import axios from "../../api/axios";

export default function Home() {
  const { isModalOpen, setIsModalOpen, isPaymentModalOpen, setIsPaymentModalOpen } = useContext(ModalContext);
  const { activeTab } = useContext(TabContext);
  const [loading] = useAxiosLoader(axios);

  return (
      <div className="home">
        <SingleRequestModal isModalOpen={isModalOpen} handleCancel={() => setIsModalOpen(false)} />
        <SinglePaymentDetails isModalOpen={isPaymentModalOpen} handleCancel={()=> setIsPaymentModalOpen(false)}/>
        
        {loading && <div className="loader-container">
          <SyncLoader color="#007AFF"/>
        </div>}

        <div className="area1">
          <Header />
        </div>
        <div className="area2">
          <SideBar />
        </div>
        <div className="area3">
          {activeTab === "dashboard" ? <Dashboard /> : 
           activeTab === "adminManagement" ? <AdminManagement /> : 
           activeTab === "payment" ? <PaymentManagement /> :
           activeTab === "settings" ? <Settings /> : 
           <Dashboard /> 
          }
        </div>
      </div>
  );
}