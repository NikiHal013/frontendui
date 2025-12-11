import 'bootstrap/dist/css/bootstrap.min.css';

import { useAsyncThunkAction } from "@hrbolek/uoisfrontend-dynamic";
import { RootProviders } from "@hrbolek/uoisfrontend-dynamic";
import { createAsyncGraphQLAction2 } from '../../../packages/dynamic/src/Core/createAsyncGraphQLAction2';
import { reduceToFirstEntity } from '../../../packages/dynamic/src/Store/Middlewares';
import { useAsync } from '../../../packages/dynamic/src/Hooks/useAsyncThunkAction';

export const GQLENDPOINT = "/api/gql"
// const getSdl = () => client.sdl()
export const App = () => {
    return (
        <RootProviders clientOptions={{ endpoint: GQLENDPOINT }}>
            <MainPage />
        </RootProviders>
    );
};

const MainPage = () => {
    return (
        <div>
            <h1>Hello world</h1>
            <Page />
            <Page2 />
        </div>
    )
}
const meQuery = `{
  me {
    __typename
    id
    email
    name
    fullname
    surname
  }
}`

const meAsyncAction = createAsyncGraphQLAction2(meQuery, reduceToFirstEntity)

export const Page = () => {
    const { loading, error, data, entity } = useAsyncThunkAction(meAsyncAction, { id: "51d101a0-81f1-44ca-8366-6cf51432e8d6" })
    return (
        <div>
            <hr />
            Page
            {loading && <div>Loading</div>}
            {error && <div>{JSON.stringify(error)}</div>}
            {data && <div>{JSON.stringify(data)}</div>}
            {entity && <div>{JSON.stringify(entity)}</div>}

            <hr />
        </div>
    )
}

export const Page2 = () => {
    const { loading, error, data, entity } = useAsync(meAsyncAction, {})
    return (
        <div>
            <hr />
            Page2
            {loading && <div>Loading</div>}
            {error && <div>{JSON.stringify(error)}</div>}
            {data && <div>{JSON.stringify(data)}</div>}
            {entity && <div>{JSON.stringify(entity)}</div>}

            <hr />
        </div>
    )
}