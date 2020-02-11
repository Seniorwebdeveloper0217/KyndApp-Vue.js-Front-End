/*=========================================================================================
  File Name: getAccount.js
  Description: Return the account for the currently logged in user.
==========================================================================================*/

import gql from "graphql-tag";

export const GET_ACCOUNT = gql`
  query getAccount($id: ID!) {
    getAccount(id: $id) {
      __typename
      ... on CareAccount {
        phoneNumber
        firstName
        lastName
        id
        onboardingCompletedAt
        termOfServiceApprovedAt
        # address
        careProfiles {
          id
          relation
          firstName
          lastName
          gender
          birthDate
          address {
            postCode
            street
            state
          }
          # avatarUrl
          # description
          # paymentPlans {
          #   id
          # }
        }
      }
      ... on SupportAccount {
        firstName
        lastName
        onboardingCompletedAt
        termOfServiceApprovedAt
        supportProfile {
          id
          gender
          services
        }
      }
      ... on OnboardingAccount {
        firstName
        lastName
        email
        id
        onboardingCompletedAt
        # description
        # avatarUrl
        termOfServiceApprovedAt
      }
    }
  }
`;
