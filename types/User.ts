/**
 * Represents a user entity with personal and business information.
 * @interface User
 * @property {string} id - Unique identifier for the user
 * @property {string} name - Full name of the user
 * @property {string} username - User's username
 * @property {Address} address - User's address information
 * @property {string} phone - User's phone number
 * @property {string} website - User's website URL
 * @property {Company} company - User's company information
 */
export interface User {
  id: string
  name: string
  username: string
  address: Address
  phone: string
  website: string
  company: Company
}

/**
 * Represents a user's address information.
 * @interface Address
 * @property {string} street - Street address
 * @property {string} suite - Suite or apartment number
 * @property {string} city - City name
 * @property {string} zipcode - Zip code
 * @property {GeoLocation} geo - Geographical coordinates (latitude and longitude)
 */
interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: GeoLocation
}

/**
 * Represents geographical coordinates.
 * @interface GeoLocation
 * @property {string} lat - Latitude
 * @property {string} lng - Longitude
 */
interface GeoLocation {
  lat: string
  lng: string
}

/**
 * Represents a user's company information.
 * @interface Company
 * @property {string} name - Company name
 * @property {string} catchPhrase - Company slogan or catchphrase
 * @property {string} bs - Business description
 */
interface Company {
  name: string
  catchPhrase: string
  bs: string
}
