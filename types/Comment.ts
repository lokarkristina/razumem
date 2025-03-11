/**
 * Represents a comment entity with its associated properties.
 *
 * @interface Comment
 * @property {string} id - The unique identifier for the comment
 * @property {string} postId - The identifier of the post this comment belongs to
 * @property {string} name - The name of the commenter
 * @property {string} email - The email address of the commenter
 * @property {string} body - The content of the comment
 */
export interface Comment {
  id: string
  postId: string
  name: string
  email: string
  body: string
}
