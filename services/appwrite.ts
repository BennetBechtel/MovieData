import { Client, Databases, ID, Query } from 'react-native-appwrite'
import { TMBD_CONFIG } from './api'

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const database = new Databases(client)

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('movie_id', movie.id),
    ])

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0]

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      )
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        count: 1,
        title: movie.title,
        poster_path: movie.poster_path,
      })
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc('count'),
    ])

    return result.documents as unknown as TrendingMovie[]
  } catch (error) {
    console.log(error)
    return undefined
  }
}

export const fetchMovieDetails = async (
  movie_id: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMBD_CONFIG.BASE_URL}/movie/${movie_id}?api_key=${TMBD_CONFIG.API_KEY}`,
      {
        method: 'GET',
        headers: TMBD_CONFIG.headers,
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch movie details')
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.log
    throw error
  }
}
