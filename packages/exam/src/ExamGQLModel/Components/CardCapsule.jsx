/**
 * @fileoverview Komponenta CardCapsule pro zobrazen\u00ed zkou\u0161ky v k\u00e1rt\u011b.
 * Je\u0161t\u011b speci\u00e1ln\u00ed card s ikonou a odkazem na zkou\u0161ku v z\u00e1hlav\u00ed.
 * @module ExamGQLModel/Components/CardCapsule
 */

import { PersonFill } from "react-bootstrap-icons"
import { Link } from "./Link"
import { CardCapsule as CardCapsule_ } from "../../../../_template/src/Base/Components"

/**
 * Speci\u00e1liz\u00e1van\u00e1 card komponenta pro zobrazen\u00ed zkou\u0161ky.
 * Zobrazuje ikonu (PersonFill), odkaz na zkou\u0161ku a jej\u00ed obsah v t\u011ble.
 * @component
 * @param {Object} props - Vlastnosti komponenty.
 * @param {Object} props.item - Objekt zkoušky.
 * @param {string} props.item.id - Identifikátor zkoušky.
 * @param {string} props.item.name - Název zkoušky.
 * @param {React.ReactNode} [props.children] - Obsah, který se vykresli v těle karty.
 * @returns {JSX.Element} Vykreslená card komponenta.
 */
export const CardCapsule = ({ item, children, title=null}) => {
    
    if (!title) {
        title = <><PersonFill /> <Link item={item} /></>
    }
    return (
        
        <CardCapsule_ title={title}>
            {children}
        </CardCapsule_>
    )
}
