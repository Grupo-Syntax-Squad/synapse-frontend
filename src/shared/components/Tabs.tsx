import type { ITabItem, ITabs } from "@/interfaces/components/Tabs";
import { classNames } from "primereact/utils";
import { Tab, Tabs as TabGroup } from "react-bootstrap";

export const Tabs = ({
  id,
  tabItems,
  alignTabTitle,
  className,
  tabItemClassName,
  tabItemBodyClassName,
  defaultClassName = true,
  defaultTabItemBodyClassName = true,
  defaultTabItemClassName = true,
  ...restTabGroup
}: ITabs) => {
  const classNameTabGroup = classNames(
    defaultClassName && "nav-tabs-alt mb-0 w-100 w-md-auto",
    className
  );
  const classNameTabItem = classNames(
    defaultTabItemClassName && "px-3 position-relative w-100 w-md-auto",
    alignTabTitle &&
      `d-flex align-items-center justify-content-${alignTabTitle}`,
    tabItemClassName
  );
  const classNameTabItemBody = classNames(
    "vstack gap-3",
    defaultTabItemBodyClassName && "p-3",
    tabItemBodyClassName
  );
  return (
    <TabGroup
      id={id}
      variant="underline"
      className={classNameTabGroup}
      {...restTabGroup}
    >
      {tabItems.map(
        ({ title, body, eventKey, ...restTabItem }: ITabItem, index) => (
          <Tab
            key={index}
            eventKey={eventKey || index}
            title={title}
            tabClassName={classNameTabItem}
            {...restTabItem}
          >
            <div className={classNameTabItemBody}>{body}</div>
          </Tab>
        )
      )}
    </TabGroup>
  );
};
