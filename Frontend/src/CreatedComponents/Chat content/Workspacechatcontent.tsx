import Message from "./Message";
import TopBar from "./TopBar"

interface Props {
      chatname: string;
      description: string;
}

function Workspacechatcontent(props: Props) {
    const {chatname,description} = props
    type Message={
        sender: string;
        time: string;
        content: string;
    }
    const message:Message[]=[
        {
            "sender":"sender 1",
            "time":"10:00",
            "content":"content1"
        },
        {
            "sender":"sender 2",
            "time":"10:01",
            "content":"content2"
        },
        {
            "sender":"sender 3",
            "time":"10:02",
            "content":"content3"
        },
        {
            "sender":"sender 4",
            "time":"10:03",
            "content":"content4"
        },
        {
            "sender":"sender 5",
            "time":"10:04",
            "content":"content5"
        },
        {
            "sender":"sender 5",
            "time":"10:04",
            "content":"content5"
        },
        {
            "sender":"sender 5",
            "time":"10:04",
            "content":"content5"
        },{
            "sender":"sender 5",
            "time":"10:04",
            "content":"content5"
        },{
            "sender":"sender 5",
            "time":"10:04",
            "content":"content5"
        },{
            "sender":"sender 5",
            "time":"10:04",
            "content":"content5"
        },{
            "sender":"sender 5",
            "time":"10:04",
            "content":"content5"
        },{
            "sender":"sender 5",
            "time":"10:04",
            "content":"content5"
        },{
            "sender":"sender 5",
            "time":"10:04",
            "content":"content5"
        },{
            "sender":"sender 5",
            "time":"10:04",
            "content":"content5"
        },{
            "sender":"sender 5",
            "time":"10:04",
            "content":"content5"
        },{
            "sender":"sender 5",
            "time":"10:04",
            "content":"content5"
        }
    ]

    return (
        <div className="w-full">
            <div className="flex-1 flex flex-col bg-slate-200 overflow-hidden h-full">
        {/* <!-- Top bar --> */}
        <TopBar chatname={chatname} description={description}/>
        {/* <!-- Chat messages --> */}
        <div className="px-6 py-4 flex-1 overflow-y-scroll">
            {/* <!-- All message --> */}
            {
                message.map((ele)=>{
                    return <Message sender={ele.sender} time={ele.time} content={ele.content}/>
                })
            }
        </div>
        <div className="pb-6 px-4 flex-none">
            <div className="flex rounded-lg border-2 border-grey overflow-hidden">
                <span className="text-3xl text-grey border-r-2 border-grey p-2">
                    <svg className="fill-current h-6 w-6 block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z"/></svg>
                  </span>
                <input type="text" className="w-full px-4" placeholder="Message #general" />
            </div>
        </div>
    </div>
        </div>
    )
}

export default Workspacechatcontent
