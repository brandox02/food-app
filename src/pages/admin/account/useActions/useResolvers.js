import { gql, useMutation } from "@apollo/client";

const UPDATE_USER = gql`
   mutation UpdateUsers($input: UpdateUserInput!) {
      updateUser(input: $input) {
         accessToken
         user {
            id imageUrl
         }
      }
   }
`

const UPDATE_PASSWORD = gql`
   mutation UpdatePassword($userId: Float!,$currentPassword: String!,$newPassword: String!) {
      updatePassword(userId: $userId, currentPassword: $currentPassword, newPassword: $newPassword)
   }
`

const UPDATE_COMPANY = gql`
   mutation UpdateCompany($input: UpdateCompanyInput!) {
      updateCompany(input: $input){
         id
      }
   }
`

export const useResolvers = () => {
   const [updateUserMutation] = useMutation(UPDATE_USER);
   const [updatePasswordMutation] = useMutation(UPDATE_PASSWORD);
   const [updateCompanyMutation] = useMutation(UPDATE_COMPANY);

   return {updateUserMutation,updatePasswordMutation,updateCompanyMutation}
}