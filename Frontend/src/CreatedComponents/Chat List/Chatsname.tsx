import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { chatclicked } from '../../Redux/Reducers/ChatReducer/chatreducer';

interface Props {
    chatname:string;
}

function Chatsname(props: Props) {
    const {chatname} = props
    const [showedit,useshowedit] = useState<Boolean>(true)
    const dispatch=useDispatch()

    return (
        <div>
        <div className='flex flex-row mx-16'>
            <div className="bg-teal-dark py-1 px-2 items-center justify-center text-white cursor-pointer text-base space"
              onClick={()=>{
                dispatch(chatclicked({name:chatname}))
              }}
            ># {chatname}
            </div>
            <div className="size-1 py-1 px-2" onClick={()=>{useshowedit(!showedit)}}><FontAwesomeIcon icon={faPen} /></div>
        </div>
        </div>
    )
}

export default Chatsname
