import { Button } from "react-bootstrap"

interface Props {
    label?: string
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void
    disabled?: boolean
}
export default function SecondaryLoginButton({ label, onClick, disabled }: Props) {
    return (
        <div className="text-center">
            <Button 
                type="button"
                size="lg" 
                variant="outline-primary" 
                className="w-100" 
                onClick={onClick}
                disabled={disabled}
            >
                {label || "Esqueci minha senha"}
            </Button>
        </div>
    )
}
