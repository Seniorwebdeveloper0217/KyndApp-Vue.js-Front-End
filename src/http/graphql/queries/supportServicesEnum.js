import gql from "graphql-tag";

export const SUPPORT_SERVICES_ENUMS = gql`
  query supportServiceEnums {
    supportServiceList: __type(name: "SupportService") {
      name
      enumValues {
        name
      }
    }
  }
`;
