import { useIsOpenQuickAction } from "../../../features/projects/states/projectsSelectors";

export const AppModals = () => {
    const isOpenQuick = useIsOpenQuickAction();
    return <>
        {isOpenQuick && }
    </>
}