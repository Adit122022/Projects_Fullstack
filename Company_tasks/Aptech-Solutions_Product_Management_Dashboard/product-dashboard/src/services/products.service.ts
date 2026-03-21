
import api from "@/api/axios";
import type { Product, ProductListResponse } from "@/types/product.types";

export const productService = {
  getAll: async (params?: {
    limit?: number;
    skip?: number;
    select?: string;
  }) => {
    const response = await api.get<ProductListResponse>("/products", {
      params,
    });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  search: async (q: string) => {
    const response = await api.get<ProductListResponse>(
      `/products/search`,
      { params: { q } },
    );
    return response.data;
  },

  getCategories: async () => {
    // DummyJSON returns array of objects with slug, name, url OR just strings depending on version.
    // Documentation says /products/categories returns array of objects now.
    // Let's type it as any for now or check current API response.
    // Docs: [ { slug: 'beauty', name: 'Beauty', url: '...' }, ... ]
    const response = await api.get<any[]>("/products/categories");
    return response.data;
  },

  getByCategory: async (category: string) => {
    const response = await api.get<ProductListResponse>(
      `/products/category/${category}`,
    );
    return response.data;
  },

  add: async (product: Omit<Product, "id">) => {
    const response = await api.post<Product>("/products/add", product);
    return response.data;
  },

  update: async (id: number, product: Partial<Product>) => {
    const response = await api.put<Product>(`/products/${id}`, product);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete<Product>(`/products/${id}`);
    return response.data;
  },
};
