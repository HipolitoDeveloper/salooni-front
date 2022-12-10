import {gql} from "@apollo/client";

export const CALL_CLOUD_CODE = gql`
    mutation CallCloudCode($input: CallCloudCodeInput!) {
        callCloudCode(input: $input) {
            result
        }
    }
`
