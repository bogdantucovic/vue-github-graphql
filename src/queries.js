import gql from 'graphql-tag';

export const getUser = (user, perPage) => gql`
  query {
    user(login: ${user}) {
        avatarUrl,
        url,
        name,
        email,
        location,
        repositories(isFork:false, first: ${perPage} ) {
          totalCount,
          edges {
            cursor
          },
          nodes {
            url,
            name,
            updatedAt
          }
        }
      }
    }`
  ;

export const getUserAfterRepos = (user, cursor, perPage) => gql`
  query {
    user(login: ${user}) {
        avatarUrl,
        url,
        name,
        email,
        location,
        repositories(isFork:false, first: ${perPage}, after: ${cursor}) {
          totalCount,
          edges {
            cursor
          },
          nodes {
            url,
            name,
            updatedAt
          }
        }
      }
    }`
  ;

export const getUserBeforeRepos = (user, cursor, perPage) => gql`
  query {
    user(login: ${user}) {
        avatarUrl,
        url,
        name,
        email,
        location,
        repositories(isFork:false, last: ${perPage}, before: ${cursor}) {
          totalCount,
          edges {
            cursor
          },
          nodes {
            url,
            name,
            updatedAt
          }
        }
      }
    }`
  ;