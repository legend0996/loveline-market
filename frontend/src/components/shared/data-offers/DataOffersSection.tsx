import { Phone, ShoppingBag, ExternalLink } from "lucide-react";
import Card from "./Card";
import SectionHeader from "./SectionHeader";
import OfferItem from "./OfferItem";
import Button from "./Button";

const DataOffersSection = () => {
  const purchaseUrl = "https://bingwahybrid.com/loveline";
  const whatsappUrl = "https://wa.me/254792590399?text=Hi%20Loveline%2C%20I%20want%20to%20buy%20an%20offer";

  return (
    <section id="data-offers" className="py-20 px-4 bg-white scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Loveline Data Solutions"
          subtitle="Pata Data, SMS or Minutes hata ukiwa na Okoa Jahazi 🥳 (Speed nayo ni umeme ⚡)"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            title="Bingwa Data Offers"
            icon="📶"
            action={
              <div className="space-y-2">
                <Button href={purchaseUrl} target="_blank" rel="noreferrer">Buy Now</Button>
                <p className="text-xs text-gray-500">Great for quick daily bundles</p>
              </div>
            }
          >
            <OfferItem amount="1.25GB" price="Ksh 55" validity="Midnight bundle" bestValue />
            <OfferItem amount="1GB" price="Ksh 19" validity="Valid for 1 hour" />
            <OfferItem amount="250MB" price="Ksh 20" validity="Valid for 24hrs" />
            <OfferItem amount="1.5GB" price="Ksh 50" validity="Valid for 3 hours" />
            <OfferItem amount="1GB" price="Ksh 99" validity="Valid for 24hrs" />
            <OfferItem amount="350MB" price="Ksh 49" validity="Valid for 7 days" />
            <OfferItem amount="2.5GB" price="Ksh 300" validity="Valid for 7 days" />
            <OfferItem amount="6GB" price="Ksh 700" validity="Valid for 7 days" />
          </Card>

          <Card
            title="Buy Many Times Data"
            icon="💊"
            action={
              <div className="space-y-2">
                <Button href={whatsappUrl} target="_blank" rel="noreferrer">Get Offer</Button>
                <p className="text-xs text-gray-500">Repeat purchase friendly</p>
              </div>
            }
          >
            <OfferItem amount="1GB" price="Ksh 22" validity="Valid for 1 hour" bestValue />
            <OfferItem amount="1.5GB" price="Ksh 52" validity="Valid for 3 hours" />
            <OfferItem amount="2GB" price="Ksh 110" validity="Valid for 24hrs" />
          </Card>

          <Card
            title="SMS Offers"
            icon="💬"
            action={
              <div className="space-y-2">
                <Button href={whatsappUrl} target="_blank" rel="noreferrer">Get Offer</Button>
                <p className="text-xs text-gray-500">Best for daily communication</p>
              </div>
            }
          >
            <OfferItem amount="20 SMS" price="Ksh 5" validity="Valid for 24hrs" />
            <OfferItem amount="200 SMS" price="Ksh 10" validity="Valid for 24hrs" bestValue />
            <OfferItem amount="1000 SMS" price="Ksh 30" validity="Valid for 7 days" />
          </Card>

          <Card
            title="Minutes Offers"
            icon="📞"
            action={
              <div className="space-y-2">
                <Button href={whatsappUrl} target="_blank" rel="noreferrer">Get Offer</Button>
                <p className="text-xs text-gray-500">Reliable voice bundles</p>
              </div>
            }
          >
            <OfferItem amount="45 mins" price="Ksh 23" validity="Valid for 3 hours" />
            <OfferItem amount="50 mins" price="Ksh 51" validity="Till midnight" bestValue />
            <OfferItem amount="250 mins" price="Ksh 210" validity="Valid for 7 days" />
          </Card>

          <Card
            title="Monthly Offers"
            icon="📅"
            className="md:col-span-2 lg:col-span-2"
            action={
              <div className="space-y-2">
                <Button href={purchaseUrl} target="_blank" rel="noreferrer">Buy Now</Button>
                <p className="text-xs text-gray-500">Long-term savings for power users</p>
              </div>
            }
          >
            <OfferItem amount="2.5GB" price="Ksh 499" validity="Valid for 30 days" />
            <OfferItem amount="10GB" price="Ksh 1000" validity="Valid for 30 days" bestValue />
            <OfferItem amount="300 mins" price="Ksh 500" validity="Valid for 30 days" />
            <OfferItem amount="1250 mins" price="Ksh 999" validity="Valid for 30 days" />
            <OfferItem amount="8GB + 400 mins" price="Ksh 1001" validity="Valid for 30 days" />
          </Card>

          <Card title="How to Purchase" icon="🛒" className="scroll-mt-24" >
            <ol className="space-y-3">
              {[
                "Go to M-Pesa",
                "Lipa na M-Pesa",
                "Buy Goods and Services",
                "Enter Till Number",
                "Pay exact amount",
              ].map((step, index) => (
                <li key={step} className="flex items-start gap-2 rounded-xl bg-gray-50 px-4 py-3 transition-all duration-300 hover:bg-gray-100">
                  <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-800 text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <div className="text-sm text-gray-700">
                    {step}
                    {step === "Enter Till Number" ? (
                      <p className="text-sm font-semibold text-gray-900 mt-0.5">3663500 (Loveline)</p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              <p className="font-medium">Note:</p>
              <p>Bingwa packages = 1 per day per number. Others can be bought multiple times.</p>
            </div>
          </Card>
        </div>

        <div id="contact" className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-md scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Buy for another number</h3>
              <p className="text-sm text-gray-500 mt-1">Fast checkout via our official link</p>
            </div>
            <Button
              href={purchaseUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full md:w-auto"
            >
              <span className="inline-flex items-center gap-2">
                Open Purchase Link <ExternalLink className="w-4 h-4" />
              </span>
            </Button>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-gray-200 pt-5">
            <div className="inline-flex items-center gap-2 text-gray-800">
              <Phone className="w-4 h-4" />
              <span className="text-sm font-semibold">0792590399 (WhatsApp or Call)</span>
            </div>
            <div className="inline-flex items-center gap-2 text-gray-800">
              <ShoppingBag className="w-4 h-4" />
              <span className="text-sm font-semibold">🔥 Loveline Data Solutions</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataOffersSection;
