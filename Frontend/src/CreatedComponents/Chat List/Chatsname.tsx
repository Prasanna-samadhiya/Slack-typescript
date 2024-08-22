interface Props {
    chatname:string;
}

function Chatsname(props: Props) {
    const {chatname} = props

    return (
        <div>
            <div className="bg-teal-dark py-1 px-2 items-center justify-center text-white"># {chatname}</div>
        </div>
    )
}

export default Chatsname
