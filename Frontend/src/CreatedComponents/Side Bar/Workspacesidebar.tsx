

interface Props {
    profilename: string
}

function Workspacesidebar(props: Props) {
    const {profilename} =props

    return (
        <div className="bg-indigo-darkest text-purple-lighter flex-none p-4 hidden md:block bg-blue-950">
        <div className="">
            <div className="bg-indigo-lighter opacity-25 h-12 w-12 flex items-center justify-center text-white   text-sm font-semibold rounded-lg mb-1 overflow-hidden">
                {profilename}
            </div>
        </div>
        <div className="cursor-pointer my-4">
            <div className="bg-white opacity-25 h-12 w-12 flex hover:bg-slate-400 items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden">
                <svg className="fill-current h-10 w-10 block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z"/> 
                </svg>
            </div>
        </div>
        </div>
    )
}

export default Workspacesidebar
