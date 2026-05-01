import Badge from "./Badge";

type OfferItemProps = {
  amount: string;
  price: string;
  validity?: string;
  bestValue?: boolean;
};

const OfferItem = ({ amount, price, validity, bestValue = false }: OfferItemProps) => {
  return (
    <div
      className={[
        "rounded-xl border border-gray-100 px-4 py-3",
        "transition-all duration-300 hover:-translate-y-0.5",
        bestValue ? "bg-gray-100" : "bg-gray-50",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col">
          <p className="font-medium text-sm text-gray-800">{amount}</p>
          <p className="font-medium text-sm text-gray-700">{price}</p>
          {validity ? <p className="text-xs text-gray-500">{validity}</p> : null}
        </div>
        {bestValue ? <Badge>🔥 Best Value</Badge> : null}
      </div>
    </div>
  );
};

export default OfferItem;
