"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

export function FooterTranslated() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-slate-200 bg-white pb-20 md:pb-0">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <div className="grid gap-8 sm:grid-cols-4">
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">{t("footer.services")}</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-sm text-slate-600 hover:text-sky-600">{t("footer.rentHotel")}</Link>
              <Link href="/" className="block text-sm text-slate-600 hover:text-sky-600">{t("footer.buyHome")}</Link>
              <Link href="/" className="block text-sm text-slate-600 hover:text-sky-600">{t("footer.payBills")}</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">{t("footer.marketplace")}</h4>
            <div className="space-y-2">
              <a href="/index.html" className="block text-sm text-slate-600 hover:text-sky-600">{t("footer.home")}</a>
              <a href="/new.html" className="block text-sm text-slate-600 hover:text-sky-600">{t("footer.explore")}</a>
              <a href="/Submit.html" className="block text-sm text-slate-600 hover:text-sky-600">{t("footer.sellProduct")}</a>
              <a href="/form.html" className="block text-sm text-slate-600 hover:text-sky-600">{t("footer.registerBusiness")}</a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">{t("footer.platform")}</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-sm text-slate-600 hover:text-sky-600">{t("footer.allServices")}</Link>
              <a href="/index.html" className="block text-sm text-slate-600 hover:text-sky-600">{t("footer.piMarketplace")}</a>
              <a href="/f1.html" className="block text-sm text-slate-600 hover:text-sky-600">{t("footer.quickRegister")}</a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">{t("footer.legal")}</h4>
            <div className="space-y-2">
              <a href="/privacy-policy.html" className="block text-sm text-slate-600 hover:text-sky-600">{t("footer.privacyPolicy")}</a>
              <a href="/terms-of-service.html" className="block text-sm text-slate-600 hover:text-sky-600">{t("footer.termsOfService")}</a>
              <a href="/form.html" className="block text-sm text-slate-600 hover:text-sky-600">{t("footer.kycPolicy")}</a>
            </div>
            <div className="mt-4 text-xs leading-6 text-slate-400">
              Omenda Pi Pays Global
              <br />
              Block A, Nyerere Road
              <br />
              Dodoma, Dodoma 41101, Tanzania
              <br />
              <a href="mailto:support@omendapipaysglobel.online" className="text-slate-500 hover:text-sky-600">
                support@omendapipaysglobel.online
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          &copy; 2026 Omenda Pi Pays &mdash; {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
}
