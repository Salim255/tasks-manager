import './_sprint-item.scss';
import type { Sprint } from "../../model/sprint.model";


export const SprintItem = ({ sprint }: {sprint: Sprint}) => {
    return <div className="sprint-item" >
            <section
                className='sprint-item__header'
            >
               
                <div>
                 Scrum {sprint.name} <span> (0 work items)</span>
                </div>
                <div>

                </div>
            </section>
            <section 
                className='sprint-item__content'> 
                {
                    sprint.tasks.map((task) => {
                        return <h1> {task.title}</h1>
                    })
                }
            </section>

            <section className='sprint-item__footer'>
                footer
            </section>
    </div>
}