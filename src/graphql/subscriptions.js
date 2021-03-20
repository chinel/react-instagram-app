import { gql } from "apollo-boost";

export const ME = gql`
  subscription me($userId: String) {
    users(where: { user_id: { _eq: $userId } }) {
      bio
      email
      id
      last_checked
      name
      phone_number
      profile_image
      user_id
      username
      website
    }
  }
`;
