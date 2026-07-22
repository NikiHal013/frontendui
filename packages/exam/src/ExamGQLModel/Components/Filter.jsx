/**
 * @fileoverview Filtrační komponenta pro vyhledávání a filtrování zkoušek.
 * Poskytuje filtry podle ID, názvu a data vytvoření.
 * @module ExamGQLModel/Components/Filter
 */

import { DateTimeFilter, Filter as BaseFilter, StringFilter, UUIDFilter } from "../../../../_template/src/Base/FormControls/Filter"

/**
 * Komponenta pro filtraci seznamu zkoušek.
 * Umožňuje filtrovat zkoušky podle:
 * - UUID (ID)
 * - Textového vyhledávání (název)
 * - Data vytvoření
 * @component
 * @param {Object} props - Vlastnosti komponenty.
 * @param {string} props.id - Identifikátor filtru.
 * @param {Function} props.onChange - Callback pro změny filtru.
 * @param {React.ReactNode} [props.children] - Dodatečné filterovací pole.
 * @returns {JSX.Element} Vykreslená filtrační komponenta.
 */
export const Filter = ({ id, onChange: handleChange, children }) => {
    return (
        <BaseFilter id={id} onChange={handleChange}>
            {/* Filtr podle UUID */}
            <UUIDFilter id="id" />
            {/* Filtr podle názvu zkoušky */}
            <StringFilter id="name" />
            {/* Filtr podle data vytvoření */}
            <DateTimeFilter id="created" emitUtcIso={false} />
            {/* Dodatečné filtry mohou být přidány přes children */}
            {children}
        </BaseFilter>
    )
}

