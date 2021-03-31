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

export const GET_POST = gql`
  subscription getPost($postId: uuid!) {
    posts_by_pk(id: $postId) {
      caption
      created_at
      id
      location
      media
      user {
        id
        name
        username
        profile_image
      }
      likes_aggregate {
        aggregate {
          count
        }
      }
      saved_posts {
        id
        user_id
      }
      comments {
        id
        content
        created_at
        user {
          username
          profile_image
        }
      }
    }
  }
`;
