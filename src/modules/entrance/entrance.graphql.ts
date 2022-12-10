import {gql} from "@apollo/client";

export const LOGIN = gql`
mutation LogIn($input: LogInInput!) {
  logIn(input: $input) {
    viewer {
      user {
        objectId
        email
        username
        acc_type
        first_access
        employee_id {
          cnpj
          email
          name
          tel
          objectId
          salon_id {
            cnpj            
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
