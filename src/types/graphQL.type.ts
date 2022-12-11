export type TGraphQLError = {
    graphQLErrors: {
        message: string,
        path: string[]
    }[]
}
