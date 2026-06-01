import { LargeCard } from "../Components"
import { UpdateBody } from "../Mutations/Update"
import { PageItemBase } from "./PageBase"

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