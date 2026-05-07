import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import { LoadingSpinner } from "@hrbolek/uoisfrontend-shared";

import { useGQLClient }
    from "../../../../dynamic/src/Store/RootProviders";

import { useGQLEntityContext }
    from "../../../../_template/src/Base/Helpers/GQLEntityProvider";

import { UpdateAsyncAction } from "../Queries";

import { MediumEditableContent } from "../Components/MediumEditableContent";

export const ExamEditForm = ({ children }) => {

    const dispatch = useDispatch();

    const gqlClient = useGQLClient();

    const {
        item,
        onChange: contextOnChange
    } = useGQLEntityContext();

    const [draft, setDraft] = useState(item);

    const [saved, setSaved] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    useEffect(() => {
        setDraft(item);
    }, [item]);

    const dirty =
        JSON.stringify(item) !== JSON.stringify(draft);

    const onChange = useCallback((e) => {

        const { id, value } = e?.target || {};

        if (!id) return;

        setDraft((prev) => ({
            ...prev,
            [id]: value,
        }));

        setSaved(false);

    }, []);

    const onSave = useCallback(async () => {

        try {

            setLoading(true);

            setError(null);

            const updateData = {
                id: draft.id,
                name: draft.name,
                nameEn: draft.nameEn,
                minScore: draft.minScore,
                maxScore: draft.maxScore,
            }

            const response =
                await dispatch(
                    UpdateAsyncAction(updateData, gqlClient)
                )

            if (response) {

                setSaved(true);

                const event = {
                    target: {
                        value: response
                    }
                };

                await contextOnChange(event);
            }

        } catch (err) {

            console.error(err);

            setError(err);

        } finally {

            setLoading(false);
        }

    }, [
        draft,
        dispatch,
        gqlClient,
        contextOnChange
    ]);

    return (
        <MediumEditableContent
            item={draft}
            onChange={onChange}
        >

            {loading && <LoadingSpinner />}

            {saved && (
                <div className="alert alert-success">
                    Uloženo
                </div>
            )}

            {error && (
                <div className="alert alert-danger">
                    {error?.message}
                </div>
            )}

            <button
                className="btn btn-primary mt-2 form-control"
                onClick={onSave}
                disabled={!dirty || loading}
            >
                Uložit změny
            </button>

            {children}

        </MediumEditableContent>
    );
};