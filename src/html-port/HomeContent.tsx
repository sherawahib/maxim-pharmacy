import { BenefitsAdvanced } from "@/html-port/BenefitsAdvanced";
import { CategoriesAdvanced } from "@/html-port/CategoriesAdvanced";
import { CtaAdvanced } from "@/html-port/CtaAdvanced";
import { ProductsAdvanced } from "@/html-port/ProductsAdvanced";
import {
  PromotionsAdvanced,
  PromoTicker,
} from "@/html-port/PromotionsAdvanced";
import { ServicesAdvanced } from "@/html-port/ServicesAdvanced";
import { VaccinationsCta } from "@/html-port/VaccinationsCta";

export function HomeContent() {
  return (
    <>
      <BenefitsAdvanced overlap />
      <div className="padding-rl float-left w-100">
        <PromoTicker />
      </div>
      <PromotionsAdvanced />
      <VaccinationsCta />
      <CategoriesAdvanced />
      <ServicesAdvanced />
      <ProductsAdvanced />
      <div className="spacer" />
      <CtaAdvanced />
    </>
  );
}
