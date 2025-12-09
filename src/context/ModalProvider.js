import { createContext, useState } from "react";

const ModalContext = createContext({});

export const ModalProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(true);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedMarket, setSelectedMarket] = useState(true);

    return (
        <ModalContext.Provider 
            value={{ 
                isModalOpen, setIsModalOpen, 
                selectedRequest, setSelectedRequest, 
                isPaymentModalOpen, setIsPaymentModalOpen,
                selectedMarket, setSelectedMarket 
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export default ModalContext;