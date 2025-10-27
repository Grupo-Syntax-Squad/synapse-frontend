import { Tabs } from "@/shared/components"
import { createContext, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Card } from "react-bootstrap"
import type { ITabItem } from "@/interfaces/components/Tabs"
import { ReportTab } from "./ReportTab"
import { SystemUsersTab } from "./SystemUsersTab"

// eslint-disable-next-line react-refresh/only-export-components
export enum HomeTabKeys {
  REPORTS = "Reports",
  CHAT = "Chat",
  USERS = "Users",
  SETTINGS = "Settings",
}

interface Props {
  isActivatedTab: Record<HomeTabKeys, boolean>
  setIsActivatedTab: React.Dispatch<
    React.SetStateAction<Record<HomeTabKeys, boolean>>
  >
  activeTab: HomeTabKeys
}

const HomeContext = createContext<Props | undefined>(undefined)

export default function HomeProvider() {
  const param = useParams()
  const defaultTab = param["default_tab"] as keyof typeof HomeTabKeys
  const [activeTab, setActiveTab] = useState<HomeTabKeys>(HomeTabKeys.REPORTS)

  const [isActivatedTab, setIsActivatedTab] = useState<
    Record<HomeTabKeys, boolean>
  >({
    [HomeTabKeys.REPORTS]: true,
    [HomeTabKeys.CHAT]: false,
    [HomeTabKeys.USERS]: false,
    [HomeTabKeys.SETTINGS]: false,
  })

  useEffect(() => {
    if (
      (defaultTab as HomeTabKeys) &&
      !isActivatedTab[HomeTabKeys[defaultTab]]
    ) {
      onTabChange(HomeTabKeys[defaultTab])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultTab])

  const allTabs: (ITabItem | null)[] = [ReportTab(), SystemUsersTab()].filter(
    Boolean
  ) // Filtra os itens nulos

  const tabsItems: ITabItem[] = allTabs as ITabItem[]

  const onTabChange = (selectedKey: string | null) => {
    if (selectedKey && selectedKey !== activeTab) {
      setActiveTab(selectedKey as HomeTabKeys)
      if (!isActivatedTab[selectedKey as HomeTabKeys]) {
        setIsActivatedTab({
          ...isActivatedTab,
          [selectedKey as HomeTabKeys]: true,
        })
      }
    }
  }

  const value: Props = {
    isActivatedTab,
    setIsActivatedTab,
    activeTab,
  }

  return (
    <HomeContext.Provider value={value}>
      <>
        <Card className="shadow-sm overflow-hidden">
          <Tabs
            activeKey={activeTab}
            onSelect={onTabChange}
            tabItems={tabsItems}
          />
        </Card>
      </>
      <></>
    </HomeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useHome = () => {
  const context = useContext(HomeContext)
  if (!context) {
    throw new Error("useHome hook can only be used inside of HomeProvider.")
  }
  return context
}
