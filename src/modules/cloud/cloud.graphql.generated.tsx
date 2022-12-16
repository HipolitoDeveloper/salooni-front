import * as Types from '../../schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CallCloudCodeMutationVariables = Types.Exact<{
  input: Types.CallCloudCodeInput;
}>;


export type CallCloudCodeMutation = { __typename?: 'Mutation', callCloudCode?: { __typename?: 'CallCloudCodePayload', result?: any | null } | null };


export const CallCloudCodeDocument = gql`
    mutation CallCloudCode($input: CallCloudCodeInput!) {
  callCloudCode(input: $input) {
    result
  }
}
    `;
export type CallCloudCodeMutationFn = Apollo.MutationFunction<CallCloudCodeMutation, CallCloudCodeMutationVariables>;

/**
 * __useCallCloudCodeMutation__
 *
 * To run a mutation, you first call `useCallCloudCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCallCloudCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [callCloudCodeMutation, { data, loading, error }] = useCallCloudCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCallCloudCodeMutation(baseOptions?: Apollo.MutationHookOptions<CallCloudCodeMutation, CallCloudCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CallCloudCodeMutation, CallCloudCodeMutationVariables>(CallCloudCodeDocument, options);
      }
export type CallCloudCodeMutationHookResult = ReturnType<typeof useCallCloudCodeMutation>;
export type CallCloudCodeMutationResult = Apollo.MutationResult<CallCloudCodeMutation>;
export type CallCloudCodeMutationOptions = Apollo.BaseMutationOptions<CallCloudCodeMutation, CallCloudCodeMutationVariables>;