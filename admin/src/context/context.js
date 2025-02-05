import { createContext, useContext, useState } from "react";
const NewsContext = createContext(null);
export const useNewsContext = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error("useNewsContext must be used within a NewsProvider");
  }
  return context;
};
export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState(null);
  return (
    <NewsContext.Provider value={{ news, setNews }}>
      {children}
    </NewsContext.Provider>
  );
};
export default NewsContext;
