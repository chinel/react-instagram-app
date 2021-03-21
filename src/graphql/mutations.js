import { gql } from "apollo-boost";

export const CREATE_USER = gql`
  mutation createUsers(
    $userId: String!
    $name: String!
    $username: String!
    $email: String!
    $bio: String!
    $website: String!
    $profileImage: String!
    $phoneNumber: String!
  ) {
    insert_users(
      objects: {
        bio: $bio
        email: $email
        name: $name
        phone_number: $phoneNumber
        profile_image: $profileImage
        user_id: $userId
        username: $username
        website: $website
      }
    ) {
      affected_rows
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser(
    $id: uuid!
    $bio: String!
    $email: String!
    $phoneNumber: String!
    $website: String!
    $name: String!
    $username: String!
  ) {
    update_users(
      where: { id: { _eq: $id } }
      _set: {
        bio: $bio
        email: $email
        name: $name
        phone_number: $phoneNumber
        username: $username
        website: $website
      }
    ) {
      affected_rows
    }
  }
`;
