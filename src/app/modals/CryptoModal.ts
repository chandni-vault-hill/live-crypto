export type CryptoModal = {
    id: string,
    name: string,
    symbol: string,
    priceUsd: string
}

export type CryptoResponseModal = {
    data: CryptoModal[]
}