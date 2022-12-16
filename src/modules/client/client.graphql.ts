import {gql} from "@apollo/client";

const CLIENT = gql`
    mutation CreateClient($input: CreateClientInput!) {
        createClient(input: $input) {
            client {
                birthdate
                email
                objectId
                tel
            }
        }
    }
`
