/**
 * @fileoverview Stránka pro úpravy existující zkoušky.
 * Poskytuje editovatelný formulář s možností zmjný všech atributů a organizáce ExamParts.
 * @module ExamGQLModel/Pages/PageUpdateItem
 */

import { LargeCard } from "../Components"
import { UpdateBody } from "../Mutations/Update"
import { PageItemBase } from "./PageBase"

/**
 * Komponenta pro editování detailu zkoušky.
 * @component
 * @param {Object} props - Vlastnosti komponenty.
 * @param {React.ComponentType} [props.SubPage=UpdateBody] - Komponenta pro formulář aktualizace.
 * @returns {JSX.Element} Vykreslená stránka s editovatelným obsahem zkoušky.
 */
export const PageUpdateItem = ({ 
    SubPage=UpdateBody,
    ...props
}) => {
    return (
        <PageItemBase 
            ItemLayout={(layoutProps) => (
                <LargeCard {...layoutProps} showPartActions={true} />
            )}
            SubPage={SubPage}
            {...props}
        />
    )
}