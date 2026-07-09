import './_dashboard.scss';
import { useEffect } from 'react';
import { fetchProjectsHttp } from '../projects/http/project.http';
import type { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';


export const Dashboard = ({ children }:{children: React.ReactNode}) => { 
    const dispatch = useDispatch<AppDispatch>();
    
    useEffect(()  => {
        dispatch(fetchProjectsHttp());
    }, [dispatch]);
    
    return  children;
}