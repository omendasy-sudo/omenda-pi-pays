"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

export function FooterTranslated() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-white/[0.06] bg-[#09090b]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-4">
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">{t("footer.services")}</h4>
            <div className="space-y-2">
              <Link href="/services/hotels" className="block text-sm text-zinc-400 hover:text-white">{t("footer.rentHotel")}</Link>
              <Link href="/services/homes" className="block text-sm text-zinc-400 hover:text-white">{t("footer.buyHome")}</Link>
              <Link href="/services/bills" className="block text-sm text-zinc-400 hover:text-white">{t("footer.payBills")}</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">{t("footer.marketplace")}</h4>
            <div className="space-y-2">
              <a href="../index.html" className="block text-sm text-zinc-400 hover:text-white">{t("footer.home")}</a>
              <a href="../new.html" className="block text-sm text-zinc-400 hover:text-white">{t("footer.explore")}</a>
              <a href="../Submit.html" className="block text-sm text-zinc-400 hover:text-white">{t("footer.sellProduct")}</a>
              <a href="../form.html" className="block text-sm text-zinc-400 hover:text-white">{t("footer.registerBusiness")}</a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">{t("footer.platform")}</h4>
            <div className="space-y-2">
              <Link href="/services" className="block text-sm text-zinc-400 hover:text-white">{t("footer.allServices")}</Link>
              <a href="../index.html" className="block text-sm text-zinc-400 hover:text-white">{t("footer.piMarketplace")}</a>
              <a href="../f1.html" className="block text-sm text-zinc-400 hover:text-white">{t("footer.quickRegister")}</a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">{t("footer.legal")}</h4>
            <div className="space-y-2">
              <span className="block text-sm text-zinc-600">{t("footer.privacyPolicy")}</span>
              <span className="block text-sm text-zinc-600">{t("footer.termsOfService")}</span>
              <span className="block text-sm text-zinc-600">{t("footer.kycPolicy")}</span>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/[0.06] pt-6 text-center text-sm text-zinc-600">
          &copy; 2026 Omenda Pi Pays &mdash; {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
}
