import { gql, useMutation } from "@apollo/client";

const UPDATE_USER = gql`
   mutation UpdateUsers($input: UpdateUserInput!) {
      updateUser(input: $input) {
         user { id imageUrl }
         accessToken
      }
   }
`

const UPDATE_PASSWORD = gql`
   mutation UpdatePassword($userId: Float!,$currentPassword: String!,$newPassword: String!) {
      updatePassword(userId: $userId, currentPassword: $currentPassword, newPassword: $newPassword)
   }
`

export const useResolvers = () => {
   const [updateUserMutation] = useMutation(UPDATE_USER);
   const [updatePasswordMutation] = useMutation(UPDATE_PASSWORD);

   return {updateUserMutation,updatePasswordMutation}
}