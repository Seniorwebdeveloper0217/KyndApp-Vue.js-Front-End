import gql from "graphql-tag";

export const RELATION_ENUMS = gql`
  query relationsEnums {
    relationshipList: __type(name: "Relation") {
      name
      enumValues {
        name
      }
    }
  }
`;
