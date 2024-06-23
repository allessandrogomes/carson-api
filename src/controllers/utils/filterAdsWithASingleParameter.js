export default function filterAdsWidthASingleParameter(field, value, filter) {
    if (value) {
        const fieldFilter = {
            [field]: { $regex: new RegExp(value.trim(), 'i') }
        };
        filter.$and = filter.$and || [];
        filter.$and.push(fieldFilter);
    }
}