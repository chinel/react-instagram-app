import { gql } from "apollo-boost";
import { gridPostFields, userFields } from "./fragments";

export const CHECK_IF_USERNAME_TAKEN = gql`
  query CheckIfUsernameTaken($username: String!) {
    users(where: { username: { _eq: $username } }) {
      username
    }
  }
`;

export const GET_USER_EMAIL = gql`
  query getUserEmail($input: String!) {
    users(
      where: {
        _or: [{ username: { _eq: $input } }, { phone_number: { _eq: $input } }]
      }
    ) {
      email
    }
  }
`;

export const GET_EDIT_USER_PROFILE = gql`
  query getEditUserProfile($id: uuid!) {
    users_by_pk(id: $id) {
      bio
      email
      id
      name
      phone_number
      profile_image
      username
      website
    }
  }
`;

export const SEARCH_USERS = gql`
  query searhUsers($query: String) {
    users(
      where: {
        _or: [{ username: { _ilike: $query } }, { name: { _ilike: $query } }]
      }
    ) {
      ...userFields
    }
  }
  ${userFields}
`;

export const GET_USER_PROFILE = gql`
  query getUserProfile($username: String!) {
    users(where: { username: { _eq: $username } }) {
      id
      username
      website
      name
      bio
      profile_image
      posts_aggregate {
        aggregate {
          count
        }
      }
      followers_aggregate {
        aggregate {
          count
        }
      }
      following_aggregate {
        aggregate {
          count
        }
      }
      posts(order_by: { created_at: desc }) {
        ...gridPostFields
      }
      saved_posts(order_by: { created_at: desc }) {
        post {
          ...gridPostFields
        }
      }
    }
  }
  ${gridPostFields}
`;

//suggest users from folllowers and also users created around the same time
export const SUGGEST_USERS = gql`
  query suggestUsers(
    $limit: Int!
    $followerIds: [uuid!]!
    $createdAt: timestamptz!
  ) {
    users(
      limit: $limit
      where: {
        _or: [
          { id: { _in: $followerIds } }
          { created_at: { _gt: $createdAt } }
        ]
      }
    ) {
      ...userFields
    }
  }
  ${userFields}
`;

//post with the most likes and comments at the top, newest to oldest
//where posts are not from the users we are following
export const EXPLORE_POSTS = gql`
  query explorePosts($followingIds: [uuid!]!) {
    posts(
      order_by: {
        created_at: desc
        likes_aggregate: { count: desc }
        comments_aggregate: { count: desc }
      }
      where: { id: { _nin: $followingIds } }
    ) {
      ...gridPostFields
    }
  }
  ${gridPostFields}
`;

export const GET_MORE_POSTS_FROM_USER = gql`
  query getMorePostsFromUser($userId: uuid!, $postId: uuid!) {
    posts(
      limit: 6
      where: { user_id: { _eq: $userId }, _not: { id: { _eq: $postId } } }
    ) {
      ...gridPostFields
    }
  }
  ${gridPostFields}
`;

export const GET_POST = gql`
  query getPost($postId: uuid!) {
    posts_by_pk(id: $postId) {
      id
      user {
        id
        username
      }
    }
  }
`;

export const GET_FEED = gql`
  query getFeed($limit: Int!, $feedIds: [uuid!]!, $lastTimestamp: timestamptz) {
    posts(
      limit: $limit
      where: { user_id: { _in: $feedIds }, created_at: { _lt: $lastTimestamp } }
      order_by: { created_at: desc }
    ) {
      id
      caption
      created_at
      media
      location
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
    }
    likes {
      id
      user_id
    }
    saved_posts {
      id
      user_id
    }
    comments(order_by: { created_at: desc }, limit: 2) {
      id
      content
      created_at
      user {
        username
      }
    }
    comments_aggregate {
      aggregate {
        count
      }
    }
  }
`;
