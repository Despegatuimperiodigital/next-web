// lib/wordpress-queries.js
import { gql } from '@apollo/client';

export const GET_POSTS_WITH_SEO = gql`
  query GetPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      nodes {
        id
        slug
        date
        title
        excerpt
        modified
        featuredImage {
          node {
            sourceUrl(size: LARGE)
            altText
          }
        }
        seo {
          ... on PostTypeSEO {
            title
            metaDesc
            canonical
            opengraphTitle
            opengraphDescription
            opengraphImage {
              sourceUrl(size: LARGE)
            }
            schema {
              raw
            }
          }
        }
        categories {
          nodes {
            name
            slug
            uri
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
            seo {
              social {
                facebook
                twitter
                linkedin
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
    seoSettings {
      schema {
        siteName
        siteUrl
      }
      webmaster {
        googleVerify
        bingVerify
      }
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
      id
      slug
      date
      title
      content
      modified
      # ... resto de los campos que necesites
    }
  }
`;