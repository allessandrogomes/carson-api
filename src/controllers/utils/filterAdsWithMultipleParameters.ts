export default function filterAdsWithMultipleParameters(
  field: string,
  values: string | undefined,
  filter: any,
) {
  if (values) {
    const terms = values
      .split(',')
      .map((term) => term.trim())
      .filter((term) => term)
    const multiFilter = {
      $or: terms.map((term) => ({
        [field]: { $regex: new RegExp(term, 'i') },
      })),
    }
    filter.$and = filter.$and || []
    filter.$and.push(multiFilter)
  }
}
