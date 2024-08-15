export default function filterAdsWithIntervalValues(
  field: string,
  value: string | undefined,
  filter: any,
) {
  if (value) {
    const range = value.split('-').map((p) => parseFloat(p))
    if (range.length === 2) {
      filter[field] = { $gte: range[0], $lte: range[1] }
    } else {
      filter[field] = parseFloat(value)
    }
  }
}
