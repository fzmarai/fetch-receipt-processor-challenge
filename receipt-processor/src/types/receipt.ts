// Receipt item interface
export interface ReceiptItem {
    shortDescription: string;
    price: string;
}

// Receipt interface
export interface Receipt {
    retailer: string;
    purchaseDate: string;
    purchaseTime: string;
    items: ReceiptItem[];
    total: string;
}

// Receipt with ID
export interface ReceiptWithId extends Receipt {
    id: string;
}

// Points interface
export interface Points {
    points: number;
}