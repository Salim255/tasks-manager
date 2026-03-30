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
    year: "2-digit",
  });
};

export const getInitialsFromProfile = (p?: { firstName?: string; lastName?: string }) => {
  if (!p) return "?";
  const f = p.firstName?.trim()?.[0] ?? "";
  const l = p.lastName?.trim()?.[0] ?? "";
  return `${f}${l}` || "?";
};
