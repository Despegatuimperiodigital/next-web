// lib/wordpress/client.js
import { 
    ApolloClient, 
    InMemoryCache, 
    createHttpLink, 
    from 
  } from '@apollo/client'
  import { onError } from '@apollo/client/link/error'
  import { gql } from '@apollo/client'
  
  // Verificamos la URL disponible
  const wpApiUrl = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL || 
                  `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`
  
  // Manejador de errores
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      })
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`)
    }
  })
  
  // Link principal
  const httpLink = createHttpLink({
    uri: wpApiUrl,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  // Configuración del cliente
  const client = new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Post: {
          keyFields: ['id', 'slug'],
        },
        Category: {
          keyFields: ['id', 'slug'],
        },
      },
    }),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  })
  
  // Verificación de la conexión
  const verifyConnection = async () => {
    try {
      await client.query({
        query: gql`
          query TestConnection {
            generalSettings {
              title
            }
          }
        `,
      })
      console.log('✅ GraphQL connection successful')
      return true
    } catch (error) {
      console.error('❌ GraphQL connection failed:', error.message)
      return false
    }
  }
  
  // Auto-verificación en desarrollo
  if (process.env.NODE_ENV === 'development') {
    verifyConnection()
  }
  
  export default client