import { IoBookmarkOutline, IoBugOutline, IoCheckboxOutline } from "react-icons/io5";

export const typeIcon = (value: string ) => {
    switch(value){
        case "story":
           return <IoBookmarkOutline />;
        case "bug":
            return <IoBugOutline />;
        default: 
        return <IoCheckboxOutline />;
    }
};
