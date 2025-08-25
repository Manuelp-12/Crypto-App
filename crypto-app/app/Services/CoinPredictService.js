export async function predictPrices(prices) {
    try {
        const response = await fetch("https://predict-bq5o.onrender.com/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prices }),
        });

        const data = await response.json();
        return data.predictions;
    } catch (error) {
        console.error("Error fetching predictions: ", error);
        return [];
    }
}