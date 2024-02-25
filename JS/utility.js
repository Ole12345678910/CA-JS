//utility.js
export function calculatePriceAndSaved(item) {
    let displayPrice = item.discountedPrice || item.price;
    let savedAmount = 0;
    if (item.discountedPrice && item.price) {
        savedAmount = parseFloat(item.price) - parseFloat(item.discountedPrice);
    }
    return { displayPrice, savedAmount };
}

