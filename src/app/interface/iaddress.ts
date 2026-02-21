export interface Iaddress {
    Id: number,
    EntrepriseName: string,
    ContactFirstName: string,
    ContactLastName: string,
    FirstLineAddress: string,
    SecondLineAddress?: string,
    City: string,
    Country: string,
    ZipCode: string,
    ContactTelephone: string,
    ContactFax?: string,
    IsDefaultAdress?: boolean
}
