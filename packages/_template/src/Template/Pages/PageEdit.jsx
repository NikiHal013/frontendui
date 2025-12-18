import { LiveEdit } from "../Components";
import { UpdateAsyncAction } from "../Queries";
import { PlaceChild } from "../Utils/PlaceChild";
import { PageCapsule } from "./PageCapsule";

const UpdateLiveEdit = (props) => (
    <LiveEdit {...props} asyncMutationAction={UpdateAsyncAction} />
);

export const PageEdit = ({ children, Editor = UpdateLiveEdit }) => {
    return (
        <PageCapsule>
            {children?children:<PlaceChild Component={Editor} />
            }
        </PageCapsule>
    );
};
