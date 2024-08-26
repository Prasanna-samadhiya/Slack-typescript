import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';

interface Props {
    chatname:string;
}

function Chatsname(props: Props) {
    const {chatname} = props
    const [showedit,useshowedit] = useState<Boolean>(true)


    return (
        <div>
        <div className='flex flex-row mx-16'>
            <div className="bg-teal-dark py-1 px-2 items-center justify-center text-white cursor-pointer text-base space"># {chatname}
            </div>
            <div className="size-1 py-1 px-2" onClick={()=>{useshowedit(!showedit)}}><FontAwesomeIcon icon={faPen} /></div>
        </div>
        </div>
    )
}

export default Chatsname
