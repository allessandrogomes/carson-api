export default function filterAdsWidthASingleParameter(
  field: string,
  value: string | undefined,
  filter: any,
) {
  if (value && typeof value === 'string') {
    const fieldFilter = {
      [field]: { $regex: new RegExp(value.trim(), 'i') },
    }
    filter.$and = filter.$and || []
    filter.$and.push(fieldFilter)
  }
}
