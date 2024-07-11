import { Button } from "@/components/ui/button";
import Image from "next/image";

interface EmptyStringProps {
    lable?: string;
    description?: string;
    image: string,
    button?: string,
}

export default function EmptyString(props: EmptyStringProps) {
    return <div className="grid place-content-center mt-auto">
        <div className="flex flex-col items-center gap-4">
            <Image src={props.image} alt={props.lable as string} />
            <p className="text-center font-bold text-4xl">{props.lable as string} !</p>
            <p className="text-muted-foreground text-xl"> {props.description as string}</p>
            {props.button && <Button className="">{props.button as string}</Button>}
        </div>
    </div>
}

