import { PlaceChild } from "../Utils/PlaceChild"
import { PageCapsule } from "./PageCapsule"
import { PageContent } from "./PageContent"

export const Page = ({ children }) => {
    return (
        <PageCapsule>
            <PlaceChild Component={PageContent}>
                {children}
            </PlaceChild>
        </PageCapsule>
    )
}
