interface Props {
    chatname: string;
}

function TopBar(props: Props) {
    const {chatname} = props

    return (
        <div>
            <div className="border-b flex px-6 py-2 items-center flex-none bg-slate-400">
            <div className="flex flex-col">
                <h3 className="text-grey-darkest mb-1 font-extrabold text-2xl">{chatname}</h3>
                <div className="text-grey-dark text-sm truncate">
                    
                </div>
            </div>
            <div className="ml-auto hidden md:block">
                <div className="relative">
                    <input type="search" placeholder="Search" className="appearance-none border border-grey rounded-lg pl-8 pr-4 py-2"/>
                </div>
            </div>
        </div>
        </div>
    )
}

export default TopBar
