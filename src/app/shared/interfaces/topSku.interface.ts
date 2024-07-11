export interface TopSku {
  productLogo: string;
  productLogoDefault: string;
  product: string;
  billing: SkuBilling;
  ranking: SkuRanking;
}

interface SkuBilling {
  vsma: number;
  vs3um: number;
}

interface SkuRanking {
  vsma: number;
  vs3um: number;
}
