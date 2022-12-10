import {gql} from "@apollo/client";

export const LOGIN = gql`
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
`
