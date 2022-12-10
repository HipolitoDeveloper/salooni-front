import * as Types from '../../schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LogInMutationVariables = Types.Exact<{
  input: Types.LogInInput;
}>;


export type LogInMutation = { __typename?: 'Mutation', logIn?: { __typename?: 'LogInPayload', viewer: { __typename?: 'Viewer', sessionToken: string, user: { __typename?: 'User', email?: string | null, username?: string | null, acc_type: string, id: string, objectId: string, employee_id?: { __typename?: 'Employee', name?: string | null, tel?: string | null, objectId: string, salon_id?: { __typename?: 'Salon', id: string, name?: string | null, objectId: string } | null } | null } } } | null };


export const LogInDocument = gql`
    mutation LogIn($input: LogInInput!) {
  logIn(input: $input) {
    viewer {
      user {
        email
        username
        acc_type
        employee_id {
          name
          tel
          objectId
          salon_id {
            id
            name
            objectId
          }
        }
        id
        objectId
      }
      sessionToken
    }
  }
}
    `;
export type LogInMutationFn = Apollo.MutationFunction<LogInMutation, LogInMutationVariables>;

/**
 * __useLogInMutation__
 *
 * To run a mutation, you first call `useLogInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInMutation, { data, loading, error }] = useLogInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLogInMutation(baseOptions?: Apollo.MutationHookOptions<LogInMutation, LogInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogInMutation, LogInMutationVariables>(LogInDocument, options);
      }
export type LogInMutationHookResult = ReturnType<typeof useLogInMutation>;
export type LogInMutationResult = Apollo.MutationResult<LogInMutation>;
export type LogInMutationOptions = Apollo.BaseMutationOptions<LogInMutation, LogInMutationVariables>;