
export interface Book {

    title: string;
    author: string;
    pages: string;
    genre: string[];
    publisher: string;
    language: string;
    isbn: string;
    price: number;
    stock: number;
    img: string;
    promo?: boolean;
    offerta_speciale?: boolean;

}

export interface ItemInCart {
    item: Book;
    qtyInCart: number;
}