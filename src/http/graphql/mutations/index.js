/*=========================================================================================
  File Name: mutations/careAccount.js
  Description: All Care Account (member) mutations.
==========================================================================================*/

import gql from 'graphql-tag'

/**
 * Update a Care Account details
 * @param {Object} $careAccount 
 * @param {String} $id 
 */
export const UPDATE_CARE_ACCOUNT = gql`
  mutation updateCareAccount($id: ID!, $value: CareAccountUpdateInput!) {
    success
  }
`

/**
 * Update a Care Account details
 * @param {Object} $newCareProfile 
 * @param {String} $id 
 */
export const ADD_CARE_PROFILE = gql`
  mutation addCareProfile($newCareProfile: CareProfileCreateInput!, $id: ID!, $relation: Relation) {
    addCareProfile(
      accountId: $id,
      relation: $relation,
      value: $newCareProfile
    ) {
      id
      firstName
      lastName
      email
      relation
    }
  }
`

/**
 * Delete a Carers Sub Profile
 * @param {String} $id The sub profile id
 */
export const DELETE_CARE_PROFILE = gql`
    mutation del_care_profile {
      deleteCareProfile(
        id: $id,
      ) {
        success
      }
    }
  }
`



/*=========================================================================================
  File Name: mutations/supportProAccount.js
  Description: All Support Pro account mutations.
==========================================================================================*/



/**
 * Update a Care Account details
 * @param {Object} $supportAccount 
 * @param {String} $id 
 */
export const UPDATE_SUPPORT_ACCOUNT = gql`
  mutation upd_support_account($supportAccount: SupportAccountUpdateInput!, $id: ID!) {
    updateSupportAccount(
      id: $id,
      value: $supportAccount
    ) {
      success
      message
    }
  }
`
