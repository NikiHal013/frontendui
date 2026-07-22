/**
 * @fileoverview Stránka pro vytváření nové zkoušky.
 * Poskytuje formulář pro vložení nové zkoušky s potvrzením.
 * @module ExamGQLModel/Pages/PageCreateItem
 */

import { ReadAsyncAction } from "../Queries"
import { Row } from "../../../../_template/src/Base/Components/Row"
import { CreateBody } from "../Mutations/Create"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { PageItemBase } from "./PageBase"

/**
 * Rozložení stránky pro vytváření nové zkoušky.
 * Obsahuje CreateBody komponenty v středním sloupci.
 * @param {Object} props - Vlastnosti komponenty.
 * @returns {JSX.Element} Vykreslený layout.
 */
const PageBody = ({...props}) => (
    <Row>
        <LeftColumn />
        <MiddleColumn>
            <CreateBody {...props} />
        </MiddleColumn>
    </Row>
)

export const PageCreateItem = ({ 
    SubPage=PageBody,
    ...props
}) => {
    return (
        <PageItemBase 
            SubPage={SubPage}
            {...props}
        />
    )
}
