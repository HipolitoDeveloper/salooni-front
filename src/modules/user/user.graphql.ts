import {gql} from "@apollo/client";

export const LOGIN = gql`
    mutation LogIn($input: LogInInput!) {
        logIn(input: $input) {
            viewer {
                user {
                    email
                    username
                    employee_id {
                        cnpj
                        email
                        employee_type
                        first_access
                        id
                        name
                        tel
                        objectId
                        salon_id {
                            cnpj
                            employee_qt
                            id
                            name
                            objectId
                        }
                    }
                }
                sessionToken
            }
        }
    }
`
