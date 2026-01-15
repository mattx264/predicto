export interface ShopItem {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: "coins" | "premium";
    rarity: "common" | "rare" | "epic" | "legendary";
    type: "avatar" | "frame" | "badge" | "title" | "bundle";
    collection?: "clubs" | "national" | "legends" | "seasonal" | "positions";
    imageUrl: string;
    previewUrl?: string;
    features?: string[];
    discount?: number;
    bestValue?: boolean;
    limitedTime?: boolean;
    isOwned?: boolean;
}

export interface UserCurrency {
    coins: number;
    premium: number;
}

export interface ShopFiltersState {
    selectedRarity: string;
    selectedType: string;
    selectedCollection: string;
}