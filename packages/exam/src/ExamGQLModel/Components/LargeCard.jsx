// import Row from "react-bootstrap/Row"
import { MediumCard } from "./MediumCard"
import { CardCapsule as CardCapsule_} from "./CardCapsule"
import { Row } from "../../../../_template/src/Base/Components/Row"
// import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { MediumContent as MediumContent_ } from "./MediumContent"
import { InteractiveMutations } from '../Mutations/InteractiveMutations'
import { LeftColumn, MiddleColumn } from "../../../../_template/src/Base/Components/Col"
import { ExamParts } from "./ExamParts"

/**
 * @fileoverview Velká card komponenta pro detailné zobrazení zkoušky.
 * Kombinuje střední kartu, obsah, parts a mutace v rozložení.
 * @module ExamGQLModel/Components/LargeCard
 */

/**
 * Velká card komponenta pro zobrazení širokého detailu zkoušky.
 * Kombinuje rozložení se střední kartou, obsahem, sekcemi a mutacemi.
 * @component
 * @param {Object} props - Vlastnosti komponenty.
 * @param {Object} props.item - Objekt zkoušky k zobrazení.
 * @param {string} props.item.id - ID zkoušky.
 * @param {string} props.item.name - Název zkoušky.
 * @param {Array} [props.item.parts] - Pole ExamParts (části zkoušky).
 * @param {React.ReactNode} [props.children] - Dodatční obsah.
 * @param {React.ComponentType} [props.CardCapsule] - Vlastní CardCapsule komponenta.
 * @param {React.ComponentType} [props.MediumContent] - Vlastní MediumContent komponenta.
 * @returns {JSX.Element} Vykreslená velká card komponenta.
 */
export const LargeCard = ({ item, children, CardCapsule=CardCapsule_, MediumContent=MediumContent_ }) => {
    // console.log("LargeCard.item", item)
    return (
        <CardCapsule item={item} >
            <Row>
                <LeftColumn>
                    <CardCapsule item={item} title="Detail">
                        <MediumContent item={item} />
                    </CardCapsule>
                    <InteractiveMutations item={item} />
                </LeftColumn>
                <MiddleColumn>
                    <ExamParts item={item} />
                    {children}
                </MiddleColumn>
            </Row>
        </CardCapsule>
    )
}