import { useState } from "react"
import { Alert } from "react-bootstrap"

interface Props {
    message: string
    color?: string
}

export const CardNotification = ({ message, color }: Props) => {
    const [show, setShow] = useState(true)
    return (
        show && (
            <Alert
                show={show}
                variant={color ?? "warning"}
                className="d-flex align-items-center justify-content-between py-0 m-0"
            >
                <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-info-circle-fill fs-5 flex-shrink-0" />
                    <span className="flex-grow-1 text-start mx-auto">{message}</span>
                </div>

                <i
                    className="bi bi-x fs-2 float-end p-1 cursor-pointer fw-bold"
                    onClick={() => setShow(false)}
                />
            </Alert>
        )
    )
}
