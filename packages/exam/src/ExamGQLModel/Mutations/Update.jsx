import {
    UpdateButton as BaseUpdateButton,
    UpdateDialog as BaseUpdateDialog,
    UpdateLink as BaseUpdateLink
} from "../../../../_template/src/Base/Mutations/Update";

import {
    MediumEditableContent,
    ReadItemURI,
    UpdateItemURI,
} from "../Components";
import {ExamEditForm} from "../Pages/ExamEditForm"

import { UpdateAsyncAction } from "../Queries";
import { CreateButton } from "./Create";
import { useNavigate } from "react-router-dom";

const DefaultContent = (props) => {

    const item = props?.item || {};

    const navigate = useNavigate();

    const typeId =
        item?.typeId || item?.type?.id || null;

    const planId =
        item?.planId || item?.plan?.id || null;

    const canCreatePart =
        Boolean(typeId && planId);

    const partDraft = {
        name: item?.name
            ? `${item.name} - part`
            : "Nový part",
        parentId: item?.id,
        typeId,
        planId,
    };

    return (
        <MediumEditableContent {...props}>


        </MediumEditableContent>
    );
};

const mutationAsyncAction = UpdateAsyncAction;

const permissions = {
    oneOfRoles: [],
    mode: "absolute",
};

// ALTERNATIVE, CHECK GQLENDPOINT
// const permissions = {
//     oneOfRoles: ["administrátor", "personalista"],
//     mode: "item",
// }

export const UpdateLink = ({
    uriPattern = UpdateItemURI,
    ...props
}) => {
    return (
        <BaseUpdateLink
            {...props}
            uriPattern={uriPattern}
            {...permissions}
        />
    );
};

export const UpdateDialog = ({
    DefaultContent: DefaultContent_ = DefaultContent,
    mutationAsyncAction:
        mutationAsyncAction_ = mutationAsyncAction,
    ...props
}) => {
    return (
        <BaseUpdateDialog
            {...props}
            DefaultContent={DefaultContent_}
            mutationAsyncAction={
                mutationAsyncAction_
            }
            {...permissions}
        />
    );
};

export const UpdateButton = ({
    DefaultContent: DefaultContent_ = DefaultContent,
    Dialog = UpdateDialog,
    mutationAsyncAction:
        mutationAsyncAction_ = mutationAsyncAction,
    uriPattern = ReadItemURI,
    ...props
}) => {
    return (
        <BaseUpdateButton
            {...props}
            DefaultContent={DefaultContent_}
            Dialog={Dialog}
            mutationAsyncAction={
                mutationAsyncAction_
            }
            uriPattern={uriPattern}
            {...permissions}
        />
    );
};

export const UpdateBody = ({ children }) => {

    return (
        <ExamEditForm>
            {children}
        </ExamEditForm>
    );
};