/*
|-------------------------------------------------------------------------------
| Utility Functions
|-------------------------------------------------------------------------------
|
| Various Utility Functions used throughout the Front End.
|
*/

/**
 * Returns the correct gender based on relationship selection.
 * @param {String} relationship
 */
export function setGenderFromRelationship(relationship) {
  const females = ["mother", "sister", "grandma", "aunt", "wife", "daughter"]
  const males = [
    "son",
    "grandpa",
    "father",
    "brother",
    "husband",
    "grandpa",
    "uncle"
  ]

  if (males.includes(relationship)) {
    return "Male"
  } else if (females.includes(relationship)) {
    return "Female"
  }
  return ""
}
