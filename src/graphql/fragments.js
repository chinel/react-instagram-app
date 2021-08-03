import { gql } from "apollo-boost";

//we are trying to create reusable fields for the users table
export const userFields = gql`
  fragment userFields on users {
    id
    name
    username
    profile_image
  }
`;

export const gridPostFields = gql`
  fragment gridPostFields on posts {
    id
    media
    likes_aggregate {
      aggregate {
        count
      }
    }
    comments_aggregate {
      aggregate {
        count
      }
    }
  }
`;
