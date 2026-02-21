export interface ICartProduct {
    ReferenceId: number;
    Price: number;
    QuantityPerBox: number;
    MinQuantity?: number;
    Selected?: boolean;
    Quantity?: number;
}
