'use client'
import qs from 'query-string'
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import useDebounce from '../newDebounce'
export function SearchInput() {
    const router = useRouter();
    const [value, setValue] = useState("");
    const debouncedValue = useDebounce(value, 500);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        if (debouncedValue !== "") { // Check for empty string
            const query = { search: debouncedValue };
            const url = `/home?${qs.stringify(query, { skipEmptyString: true, skipNull: true })}`;
            router.push(url);
        }
    }, [debouncedValue, router]);

    return (
        <div className="w-full relative">
            <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
                onChange={handleChange} 
                value={value} 
                placeholder="Search boards.." 
                className="w-full max-w-[516px] pl-9" 
            />
        </div>
    );
}
