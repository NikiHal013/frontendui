import { Input } from "../../../../_template/src/Base/FormControls/Input"

/**
 * A component that displays medium-level content for an template entity.
 *
 * This component renders a label "TemplateMediumContent" followed by a serialized representation of the `template` object
 * and any additional child content. It is designed to handle and display information about an template entity object.
 *
 * @component
 * @param {Object} props - The properties for the TemplateMediumContent component.
 * @param {Object} props.template - The object representing the template entity.
 * @param {string|number} props.template.id - The unique identifier for the template entity.
 * @param {string} props.template.name - The name or label of the template entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `template` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const templateEntity = { id: 123, name: "Sample Entity" };
 * 
 * <TemplateMediumContent template={templateEntity}>
 *   <p>Additional information about the entity.</p>
 * </TemplateMediumContent>
 */
export const MediumEditableContent = ({ item, draft, onChange=(e)=>null, onBlur=(e)=>null, children}) => {
    const source = draft ?? item ?? {}
    return (
        <>           
        {/* defaultValue={item?.name|| "Název"}  */}
            <Input id={"name"} label={"Jméno"} className="form-control" value={source?.name ?? ""} placeholder={"Jméno"} onChange={onChange} />
            <Input id={"nameEn"} label={"Anglický název"} className="form-control" value={source?.nameEn ?? ""} placeholder={"Anglický název"} onChange={onChange} />
            <Input id={"minScore"} type="number" label={"Minimální počet bodů"} className="form-control" value={source?.minScore ?? ""} placeholder={"Minimální počet bodů"} onChange={onChange} />
            <Input id={"maxScore"} type="number" label={"Maximální počet bodů"} className="form-control" value={source?.maxScore ?? ""} placeholder={"Maximální počet bodů"} onChange={onChange} />
            

            {children}
        </>
    )
}
