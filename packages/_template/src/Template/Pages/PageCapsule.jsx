import { AsyncActionProvider } from "../../Base/Helpers/GQLEntityProvider"
import { ReadAsyncAction } from "../Queries"
import { PageContent } from "./PageContent"

export const PageCapsule = ({ children, queryAsyncAction=ReadAsyncAction }) => {
    const {id} = useParams()
    const item = {id}
    return (
        <AsyncActionProvider item={item} queryAsyncAction={queryAsyncAction}>
            <PageContent>
                {children}
            </PageContent>
        </AsyncActionProvider>
    )
}
