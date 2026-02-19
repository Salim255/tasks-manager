import './_backlog.scss';
import { BiPlus } from "react-icons/bi";

export const Backlog = () => {
    return(
        <section className="backlog-container">
            <div className='backlog'>
               <section className='backlog__header'>
                    <div>
                        backlog (0 item)
                    </div>
                    <div>
                        create sprint
                    </div>
               </section>
                <section className='backlog__content' >
                    your backlog is empty
                </section>
                <section className='backlog__footer'>
                    <span><BiPlus /></span>
                    create work Item
                </section>
            </div>
        </section>
    )
}