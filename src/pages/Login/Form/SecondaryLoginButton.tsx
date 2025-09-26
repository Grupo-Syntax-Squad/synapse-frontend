import { Button } from "react-bootstrap"

interface Props {
    label?: string
    onClick: () => Promise<void> | void
}
export default function SecondaryLoginButton({ label, onClick }: Props) {
    return (
        <div className="text-center">
            <Button size="lg" variant="outline-primary" className="w-100" onClick={onClick}>
                {label || "Esqueci minha senha"}
            </Button>
        </div>
    )
}
