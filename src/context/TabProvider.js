import { createContext, useState } from "react";

const TabContext = createContext({});

export const TabProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState("dashboard");

    return (
        <TabContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </TabContext.Provider>
    );
};

export default TabContext;