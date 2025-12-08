import { Button } from "../ui/button"

interface Props {
    text: string
    active?: boolean
    callback: () => void
}

export default function PaginationButton({ text, active = false, callback }: Props) {
    return (
        <Button
            variant={active ? "outline" : "ghost"}
            className="cursor-pointer"
            onClick={callback}
        >
            {text}
        </Button>
    )
}