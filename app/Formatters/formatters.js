//converts Double to currency with 2 decimal places
export function currecyFormatter2(value) {
    value = value ?? 0;
    return new Intl.NumberFormat("en-US", {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

//converts Double to currency with 2 decimal places as a String
export function asCurrencyWith2Decimals(value) {
    return currecyFormatter2(value).toString() ?? "$0.00";
}

//converts Double to currency with 2-6 decimal places
export function currecyFormatter6(value) {
    value = value ?? 0;
    return new Intl.NumberFormat("en-US", {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
    }).format(value);
}

//converts Double to currency with 2-6 decimal places as a String
export function asCurrencyWith6Decimals(value) {
    return currecyFormatter6(value).toString() ?? "$0.00";
}

//converts double to number with max 2 decimal places
export function asNumberString(value) {
    value = value ?? 0;
    return value.toFixed(2).toString();
}

//converts double to number as String with max 2 decimal places with percent symbol(%)
export function asPercentString(value) {
    value = value ?? 0;
    return asNumberString(value) + "%";
}

export function formattedWithAbbreviations(value) {
    let num = Math.abs(value);
    let sign = value < 0 ? "-" : "";

    let formatted;
    let stringFormatted;

    if (num >= 1_000_000_000_000) {
        formatted = num / 1_000_000_000_000;
        stringFormatted = asNumberString(formatted);
        return sign + `${stringFormatted}T`;
    }
    else if (num >= 1_000_000_000) {
        formatted = num / 1_000_000_000;
        stringFormatted = asNumberString(formatted);
        return sign + `${stringFormatted}B`;
    }
    else if (num >= 1_000_000) {
        formatted = num / 1_000_000;
        stringFormatted = asNumberString(formatted);
        return sign + `${stringFormatted}M`;
    }
    else if (num >= 1_000) {
        formatted = num / 1_000;
        stringFormatted = asNumberString(formatted);
        return sign + `${stringFormatted}K`;
    }
    else if (num >= 0) {
        return asNumberString(value);
    }
}

export function formatDate(value) {
    const date = new Date(value);

    const mm = String(date.getMonth() + 1);
    const dd = String(date.getDate());
    const yy = String(date.getFullYear()).slice(-2); //last 2 digits of year

    return `${mm}/${dd}/${yy}`;
}