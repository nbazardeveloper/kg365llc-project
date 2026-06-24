import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type PortfolioProject = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  location: string | null;
  before_image_url: string | null;
  after_image_url: string;
  gallery: unknown;
  featured: boolean;
  display_order: number;
  created_at: string;
};

export const portfolioListQuery = queryOptions({
  queryKey: ["portfolio", "all"],
  staleTime: 60_000,
  queryFn: async (): Promise<PortfolioProject[]> => {
    const { data, error } = await supabase
      .from("portfolio_projects")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as PortfolioProject[];
  },
});

export const featuredPortfolioQuery = queryOptions({
  queryKey: ["portfolio", "featured"],
  staleTime: 60_000,
  queryFn: async (): Promise<PortfolioProject[]> => {
    const { data, error } = await supabase
      .from("portfolio_projects")
      .select("*")
      .eq("featured", true)
      .order("display_order", { ascending: true })
      .limit(6);
    if (error) throw error;
    return (data ?? []) as PortfolioProject[];
  },
});
