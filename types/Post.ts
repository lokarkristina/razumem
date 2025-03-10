/**
 * Represents a post entity with its associated properties.
 *
 * @interface Post
 * @property {number} userId - The identifier of the user who created the post
 * @property {number} id - The unique identifier for the post
 * @property {string} title - The title of the post
 * @property {string} body - The main content/body of the post
 */
export interface Post {
  userId: number
  id: number
  title: string
  body: string
}
