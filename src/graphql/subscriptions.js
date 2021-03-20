import { gql } from "apollo-boost";

export const ME = gql`
  subscription me($userId: String) {
    users(where: { user_id: { _eq: $userId } }) {
      id
      last_checked
      name
      profile_image
      user_id
      username
    }
  }
`;
