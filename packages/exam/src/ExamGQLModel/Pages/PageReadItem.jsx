/**
 * @fileoverview Stránka pro čtení detailu jedné zkoušky.
 * Poskytuje readonly zobrazení všech informací o zkoušce.
 * @module ExamGQLModel/Pages/PageReadItem
 */

import { GeneratedContentBase } from "../../../../_template/src/Base/Pages/Page"
import { PageItemBase } from "./PageBase"

/**
 * Komponenta pro zobrazení detailu zkoušky v režimu jen pro čtení.
 * @component
 * @param {Object} props - Vlastnosti komponenty.
 * @param {React.ComponentType} [props.SubPage=GeneratedContentBase] - Komponenta pro vnitříkší obsah.
 * @returns {JSX.Element} Vykreslená readonly stránka detailu zkoušky.
 */
export const PageReadItem = ({ 
    SubPage=GeneratedContentBase,
    ...props
}) => {
    return (
        <PageItemBase SubPage={SubPage} {...props}/>
    )
}