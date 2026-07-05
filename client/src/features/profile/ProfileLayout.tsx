import './_profile.scss';
import { motion } from 'motion/react';

export const ProfileLayout = ({children}:{children: React.ReactNode}) => {

    return <motion.div className='profile-layout'>
        {children}
    </motion.div>
}
