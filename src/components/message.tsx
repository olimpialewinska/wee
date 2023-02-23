import { classNames } from "@/utils";

interface MessageProps{
    message: string;
    time: string;
    isSelf: boolean;
}



export function Message(props : MessageProps) {

    return(
        <div className= {classNames("message", props.isSelf && "message-self")}>
            <div 
            className={classNames("message-content", props.isSelf && "content-self")}>
                <div className="message-content-text">hsjdcnsn jsdjjn skisd isdsjjs ijsijs </div>
            </div>
            <div className="message-time">Time</div>
        </div>
    )
}