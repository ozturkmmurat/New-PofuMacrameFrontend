export interface CategoryImage {
  id: number;
  categoryId: number;
  path: string;
  /** Fotoğrafın gösterim sırası. Listeler bu sıraya göre döner. */
  sequenceNumber: number;
  createDate: string;
}
