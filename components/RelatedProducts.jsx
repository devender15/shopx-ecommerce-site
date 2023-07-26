import { Heading, Card } from "@components";
import { TailSpin } from "react-loader-spinner";

export default function RelatedProducts({
  relatedProducts,
  handleOpenProductInfoModal,
}) {
  return (
    <div className="h-full w-full overflow-x-auto overflow-y-hidden flex flex-col gap-y-6">
      <Heading text="Related Products" />

      {relatedProducts.length > 0 ? (
        <div className="mt-4 flex items-center justify-start flex-wrap">
          {relatedProducts?.map((product) => (
            <Card
              key={product._id}
              product={product}
              handleOpenProductInfoModal={handleOpenProductInfoModal}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <TailSpin color="gray" height={50} width={50} />
        </div>
      )}
    </div>
  );
}
