// import {
//   IconTypeCardFieldGroup,
//   TitleTypeCardFieldGroup,
// } from "@/interfaces/components/CardFieldGroupRoute";
// import type { ReactNode } from "react";
// import { Card, CardBody } from "react-bootstrap";

// interface Props {
//   title: TitleTypeCardFieldGroup;
//   children?: ReactNode;
// }
// export const CardFieldGroup = ({ title, children }: Props) => {
//   const iconMap: Record<TitleTypeCardFieldGroup, IconTypeCardFieldGroup> = {
//     [TitleTypeCardFieldGroup.ROUTER]: IconTypeCardFieldGroup.ROUTER,
//     [TitleTypeCardFieldGroup.CONDOMINIUM]: IconTypeCardFieldGroup.CONDOMINIUM,
//   };
//   const icon = iconMap[title];

//   return (
//     <Card className="w-100 my-3">
//       <Card.Header className="d-flex gap-2 text-primary fw-bold">
//         <i className={icon} /> <span>{title}</span>
//       </Card.Header>
//       <CardBody>{children}</CardBody>
//     </Card>
//   );
// };
