export interface CategoryDto {
  categoryId: number;
  categoryName: string;
  parentId?: number;
  /** Kategorinin ilk fotoğrafı (SequenceNumber'a göre). */
  imagePath: string;
}
