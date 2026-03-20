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

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
};
