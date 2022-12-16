import * as Types from '../../schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SalonsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.SalonWhereInput>;
}>;


export type SalonsQuery = { __typename?: 'Query', salons: { __typename?: 'SalonConnection', edges?: Array<{ __typename?: 'SalonEdge', node?: { __typename?: 'Salon', name?: string | null, objectId: string } | null } | null> | null } };


export const SalonsDocument = gql`
    query Salons($where: SalonWhereInput) {
  salons(where: $where) {
    edges {
      node {
        name
        objectId
      }
    }
  }
}
    `;

/**
 * __useSalonsQuery__
 *
 * To run a query within a React component, call `useSalonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSalonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSalonsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useSalonsQuery(baseOptions?: Apollo.QueryHookOptions<SalonsQuery, SalonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SalonsQuery, SalonsQueryVariables>(SalonsDocument, options);
      }
export function useSalonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SalonsQuery, SalonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SalonsQuery, SalonsQueryVariables>(SalonsDocument, options);
        }
export type SalonsQueryHookResult = ReturnType<typeof useSalonsQuery>;
export type SalonsLazyQueryHookResult = ReturnType<typeof useSalonsLazyQuery>;
export type SalonsQueryResult = Apollo.QueryResult<SalonsQuery, SalonsQueryVariables>;