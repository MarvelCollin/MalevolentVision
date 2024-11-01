async function fetchAssets(){
    try {
        const response = await fetch('../assets/assets_connector.json');
        if(!response.ok) throw new Error("ga dapet assetsnya king");
        const assets = await response.json();
        return assets;
    } catch {
        console.log("assetsnya error, masuk ke catch")
    }
}

export const ASSETS = await fetchAssets();