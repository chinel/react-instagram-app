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
