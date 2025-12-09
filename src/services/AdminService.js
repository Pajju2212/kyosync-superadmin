import axios from "../api/axios";

// src/services/AdminService.js

// Mock data to show in the UI immediately
const MOCK_DATA = [
  {
    id: 1,
    userId: 101,
    businessName: "Caravan Fresh",
    ownerName: "Kavindu",
    nic: "971033916v",
    businessAddress: "Dalugama, Kelaniya",
    companyRegistration: "123654789q",
    businessRegistration: "789465132w",
    businessEmail: "caravan@example.com",
    mobileNumber: "0722323341",
    businessWebsite: "www.caravan.lk",
    status: 1, // 1: Pending, 2: Accepted, 3: Declined
    emailVerified: true,
    mobileVerified: true
  },
  {
    id: 2,
    userId: 102,
    businessName: "Boon Foods",
    ownerName: "Sahan",
    nic: "951233916v",
    businessAddress: "Colombo 07",
    companyRegistration: "999654789q",
    businessRegistration: "888465132w",
    businessEmail: "boon@example.com",
    mobileNumber: "0771234567",
    businessWebsite: "www.boonfoods.lk",
    status: 2, 
    emailVerified: true,
    mobileVerified: true
  }
];

export const AdminService = {
    getAll: async () => {
        // Return mock data immediately (simulating a fast server)
        return Promise.resolve(MOCK_DATA);
    },

    approveRequest: async (ids) => {
        return Promise.resolve({ success: true });
    },

    declineRequest: async (ids) => {
        return Promise.resolve({ success: true });
    },
}