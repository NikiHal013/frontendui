import { useCallback } from "react";
import { useAsyncAction } from "./useAsyncAction";
import { useGQLClient } from "../Store";

/**
 * Stejná signatura jako useAsyncThunkAction:
 *
 * @param {(vars: any, client: any) => (dispatch: Function, getState: Function, next?: Function) => Promise<any>} createAsyncAction
 *        typicky výstup z createAsyncGraphQLAction2
 * @param {any} initialVars - počáteční proměnné (stejně jako u useAsyncAction / useAsyncThunkAction)
 * @param {import("./useAsyncAction").UseAsyncActionOptions} [options]
 *
 * Vrací:
 *  - loading
 *  - error
 *  - gqlresult  (to, co vrátí thunk / middleware chain)
 *  - run(vars?) – spustí action s proměnnými
 *  - read(vars?) – Suspense-friendly reader (stejně jako u useAsyncAction)
 */
export const useAsyncGraphQLLocal = (
    createAsyncAction,
    initialVars,
    options
) => {
    const gqlClient = useGQLClient();

    // asyncFn má stejný tvar jako pro useAsyncAction: (vars) => Promise<result>
    const asyncFn = useCallback(
        async (vars) => {
            // createAsyncGraphQLAction2 → AsyncAction(vars, client) => thunk(...)
            const thunk = createAsyncAction(vars, gqlClient);

            // obejdeme Redux store – fake dispatch / getState
            const dispatch = (af) => {
                console.log("dispatch call", af)
            };
            const getState = () => ({});

            // poslední argument `next` necháme default (identity),
            // takže AsyncAction vrátí výsledek middleware chainu
            const result = await thunk(dispatch, getState);
            return result;
        },
        [createAsyncAction, gqlClient]
    );

    // reuse stávající generický hook
    const {
        loading,
        error,
        data,   // tady bude náš gqlResult
        run,
        read,
    } = useAsyncAction(asyncFn, initialVars, options);

    return {
        loading,
        error,
        gqlresult: data,
        run,
        read,
    };
};