
export interface SearchResult {
  id: string;
  title: string;
  type: 'project' | 'service' | 'product';
  description?: string;
  path?: string;
}
