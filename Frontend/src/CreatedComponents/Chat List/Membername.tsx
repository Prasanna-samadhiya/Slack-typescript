import { useState } from "react";

interface Props {
    Membername: String;
    Isyou?: Boolean
}

function Membername(props: Props) {
    const {Membername} = props
    const [isyou] =useState<Boolean>(false)
    if(isyou){

    }

    return (
        <div>
            <div className="flex mb-3 px-4 justify-center items-center">
                <svg className="h-2 w-2 fill-current text-green mr-2" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10"/></svg>
                <span className="text-white opacity-75 font-semibold">
                    {Membername} 
                    {isyou?<span className="text-grey text-sm">(you)</span>:null}
                </span>
            </div>
        </div>
    )
}

export default Membername
