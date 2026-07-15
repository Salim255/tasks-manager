import { PageMotion } from '../../shared/motion/PageMotion';
import './_profile.scss';

export const ProfileLayout = ({children}:{children: React.ReactNode}) => {

    return <PageMotion>
        {children}
    </PageMotion>
}
