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

export const EDIT_USER_AVATAR = gql`
  mutation editUserAvatar($id: uuid!, $profileImage: String!) {
    update_users(
      where: { id: { _eq: $id } }
      _set: { profile_image: $profileImage }
    ) {
      affected_rows
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost(
    $caption: String!
    $location: String!
    $media: String!
    $userId: uuid!
  ) {
    insert_posts(
      objects: {
        caption: $caption
        location: $location
        media: $media
        user_id: $userId
      }
    ) {
      affected_rows
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($postId: uuid!, $userId: uuid!, $profileId: uuid!) {
    insert_likes(objects: { post_id: $postId, user_id: $userId }) {
      __typename
    }
    insert_notifications(
      objects: {
        post_id: $postId
        profile_id: $profileId
        type: "like"
        user_id: $userId
      }
    ) {
      affected_rows
    }
  }
`;

export const UNLIKE_POST = gql`
  mutation unLikePost($postId: uuid!, $userId: uuid!, $profileId: uuid!) {
    delete_likes(
      where: { post_id: { _eq: $postId }, user_id: { _eq: $userId } }
    ) {
      affected_rows
    }
    delete_notifications(
      where: {
        profile_id: { _eq: $profileId }
        type: { _eq: "like" }
        user_id: { _eq: $userId }
        post_id: { _eq: $postId }
      }
    ) {
      affected_rows
    }
  }
`;

export const SAVE_POST = gql`
  mutation savePost($postId: uuid!, $userId: uuid!) {
    insert_saved_posts(objects: { post_id: $postId, user_id: $userId }) {
      affected_rows
    }
  }
`;

export const UNSAVE_POST = gql`
  mutation unSavePost($postId: uuid!, $userId: uuid!) {
    delete_saved_posts(
      where: { post_id: { _eq: $postId }, user_id: { _eq: $userId } }
    ) {
      affected_rows
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($userId: uuid!, $postId: uuid!, $content: String!) {
    insert_comments(
      objects: { user_id: $userId, post_id: $postId, content: $content }
    ) {
      returning {
        id
        created_at
        post_id
        user_id
        content
        user {
          username
        }
      }
    }
  }
`;

export const CHECK_NOTIFICATIONS = gql`
  mutation checkNotifications($userId: uuid!, $lastChecked: String!) {
    update_users(
      where: { id: { _eq: $userId } }
      _set: { last_checked: $lastChecked }
    ) {
      affected_rows
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation followUser($userIdToFollow: uuid!, $currentUserId: uuid!) {
    insert_followers(
      objects: { user_id: $userIdToFollow, profile_id: $currentUserId }
    ) {
      affected_rows
    }
    insert_following(
      objects: { user_id: $currentUserId, profile_id: $userIdToFollow }
    ) {
      affected_rows
    }
    insert_notifications(
      objects: {
        user_id: $currentUserId
        profile_id: $userIdToFollow
        type: "follow"
      }
    ) {
      affected_rows
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation unFollowUser($userIdToFollow: uuid!, $currentUserId: uuid!) {
    delete_followers(
      where: {
        user_id: { _eq: $userIdToFollow }
        profile_id: { _eq: $currentUserId }
      }
    ) {
      affected_rows
    }
    delete_following(
      where: {
        user_id: { _eq: $currentUserId }
        profile_id: { _eq: $userIdToFollow }
      }
    ) {
      affected_rows
    }
    delete_notifications(
      where: {
        user_id: { _eq: $currentUserId }
        profile_id: { _eq: $userIdToFollow }
        type: { _eq: "follow" }
      }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: uuid!, $userId: uuid!) {
    delete_posts(where: { id: { _eq: $postId }, user_id: { _eq: $userId } }) {
      affected_rows
    }
    delete_likes(where: { post_id: { _eq: $postId } }) {
      affected_rows
    }
    delete_saved_posts(where: { post_id: { _eq: $postId } }) {
      affected_rows
    }
    delete_notifications(where: { post_id: { _eq: $postId } }) {
      affected_rows
    }
  }
`;
