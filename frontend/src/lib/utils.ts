export function formatData(date: Date) {
    return date.toLocaleString("en-GB", {
        month: "short",
        day: "numeric",
        year: "numeric"
    })
}