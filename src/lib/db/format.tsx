export function formatPrice (price: number) {
    return (
        price/100
    ).toLocaleString('vi-VN', {
        style: "currency",
        currency: "VND"
    })
}