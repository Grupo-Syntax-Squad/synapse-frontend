import type { DialogProps } from "primereact/dialog"
import type { JSX } from "react"

type WithoutDefaultFooter = {
  footer?: React.ReactNode | ((props: DialogProps) => React.ReactNode)
  type: "message"
}
type WithDefaultFooter = IModalFooter & {
  type: "action"
}

export type TDialogProps = Omit<
  DialogProps,
  "onHide" | "onShow" | "visible" | "footer"
>

export type TModal = TDialogProps & {
  body: JSX.Element
  readOnly?: boolean
  defaultFooter?: boolean
  footer?: React.ReactNode | ((props: DialogProps) => React.ReactNode)
} & (WithDefaultFooter | WithoutDefaultFooter)

export type TModalProps = TDialogProps & {
  footer: React.ReactNode | ((props: DialogProps) => React.ReactNode)
  readOnly?: boolean
}

export type TModalForwardHandles = {
  show: (params: TModal) => void
  hide: () => void
}

export interface IModalFooter {
  onCancel?: () => void
  onConfirm?: () => void
  cancelLabel?: string
  closeLabel?: string
  confirmLabel?: string
  disabledConfirm?: boolean
}

export interface IModalUCPutUser {
  userId: number
  userName?: string
  userEmail?: string
  receiveReports?: boolean | null
  onSuccess?: () => Promise<void>
}
