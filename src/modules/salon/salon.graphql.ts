import {gql} from "@apollo/client";

const SEARCH_SALONS_BY_NAME = gql`
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
`