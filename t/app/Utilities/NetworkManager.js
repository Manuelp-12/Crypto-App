async function download(url) {
    try {
        const response = await fetch(url, {
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': 'CG-4kDBVaCTP9fdn2Ykf6nDSVtr', //API key
            },
        });

        return await response.json();
    }
    catch (e) {
        console.error("Bad url response: url - ", url);
        return null;
    }
}

function handleCompletion(data, ModelClass) {
    try {
        const newItem = new ModelClass(data);
        return newItem;
    }
    catch (e) {
        console.error("Error in creating ", ModelClass, "from ", data);
        throw e;
    }
}

export { download, handleCompletion };
