interface layoutProps {
    children : React.ReactNode;
}

const Layout =  ({children}:layoutProps) =>{
    return (
        <div>
            this is a user home layout 
            {children}
        </div>
    )
}

export default Layout;