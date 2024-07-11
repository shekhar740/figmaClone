export function TextView({url}:{url:string}){
    return (
        <div className="w-full h-[600px]">
            <iframe className="w-full h-full" src={url} />
        </div>
    )
}