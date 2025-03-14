export interface AccountModel extends AccountInput {
  id: string;
}

export interface AccountInput {
  ownerId: string;
  type: string;
  balance: number;
}
