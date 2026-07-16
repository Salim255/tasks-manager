import { PageMotion } from '../../shared/motion/PageMotion';

export const ProfileLayout = ({children}:{children: React.ReactNode}) => {

    return <PageMotion>
        {children}
    </PageMotion>
}
