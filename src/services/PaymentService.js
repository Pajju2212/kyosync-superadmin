
import axios from "axios";
// src/services/PaymentService.js

const MOCK_PAYMENT_DATA = [
  {
    id: 1,
    userId: 201,
    businessName: "KIKO Café",
    ownerName: "Nimal",
    nic: "881033916v",
    businessAddress: "Kandy Road, Kiribathgoda",
    companyRegistration: "555654789q",
    businessRegistration: "444465132w",
    businessEmail: "kiko@example.com",
    mobileNumber: "0712323341",
    businessWebsite: "www.kiko.lk",
    status: 1,
    category: "Café",
    totalPayouts: "150",
    todayEarnings: "$1,200.00",
    readyToRelease: "$1,150.00",
    emailVerified: true,
    mobileVerified: true
  },
  {
    id: 2,
    userId: 202,
    businessName: "Burger King",
    ownerName: "Manager",
    nic: "771033916v",
    businessAddress: "Galle Road, Colombo",
    companyRegistration: "222654789q",
    businessRegistration: "111465132w",
    businessEmail: "bk@example.com",
    mobileNumber: "0112323341",
    businessWebsite: "www.bk.lk",
    status: 1,
    category: "Fast Food",
    totalPayouts: "500",
    todayEarnings: "$5,300.00",
    readyToRelease: "$5,000.00",
    emailVerified: true,
    mobileVerified: true
  }
];

export const PaymentService = {
    getAll: async () => {
        return Promise.resolve(MOCK_PAYMENT_DATA);
    }
}