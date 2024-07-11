import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
    title: string;
    authorLabel: string;
    disabled: boolean;
    isFavourite: boolean; // Changed to boolean
    createdAtLabel: string;
    onClick: () => void;
}



export function Footer({ title, authorLabel, disabled, isFavourite, createdAtLabel, onClick }: FooterProps) {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation()
        event.preventDefault();
        onClick();
      

    }
    return (
        <div className="relative p-3">
            <p className="truncate text-2xl max-w-[calc(100%-20px)]">{title}</p>
            <p className="opacity-0 group-hover:opacity-100 transition-opacity text-sm text-muted-foreground truncate">
                {authorLabel}, {createdAtLabel}
            </p>
            <button
                disabled={disabled}
                onClick={handleClick} // Changed to onClick
                className={cn(
                    "opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-blue-600",
                    disabled && "cursor-not-allowed opacity-75"
                )}
            >
                <Star
                    className={cn(
                        "w-4 h-4",
                        isFavourite && "text-blue-600 fill-blue-600"
                    )}
                />
            </button>
        </div>
    );
}
