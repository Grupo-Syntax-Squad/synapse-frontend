import { routeMap, RouteMapKeys } from "@/constants/routes";
import { createContext, useContext, useRef, useState } from "react";

interface Props {
  suffix: string;
  pageTitle: string;
  browserTitle: string;
  setTitle: (title: string) => void;
  setPageTitle: (newTitle: string) => void;
  setBrowserTitle: (newTitle: string, scrollTop?: boolean) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const TitleContext = createContext<Props | undefined>(undefined);

export const TitleProvider = ({ children }: { children: React.ReactNode }) => {
  const browserTitleRef = useRef("");
  const [pageTitle, setPageTitle] = useState("");
  const suffix = " - Synapse";

  const documentTitle = (title?: string) => {
    return (title || routeMap[RouteMapKeys.ROOT].title) + suffix;
  };

  const setTitle = (title: string) => {
    setBrowserTitle(title, true);
    handleSetPageTitle(title);
  };
  const handleSetPageTitle = (newTitle: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    newTitle !== pageTitle && setPageTitle(newTitle);
  };

  const setBrowserTitle = (newTitle: string, scrollToTop: boolean = false) => {
    if (newTitle !== browserTitleRef.current) {
      browserTitleRef.current = newTitle;
      document.title = documentTitle(newTitle);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    scrollToTop && window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const values: Props = {
    browserTitle: browserTitleRef.current,
    pageTitle,
    suffix,
    setTitle,
    setPageTitle: handleSetPageTitle,
    setBrowserTitle,
  };
  return (
    <TitleContext.Provider value={values}>{children}</TitleContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTitle = () => {
  const context = useContext(TitleContext);
  if (!context) {
    throw new Error("useTitle must be used within a TitleProvider");
  }
  return context;
};
