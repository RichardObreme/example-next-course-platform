import LoadingSpinner from "@/components/LoadingSpinner";
import PageHeader from "@/components/PageHeader";
import { db } from "@/drizzle/db";
import { ProductTable } from "@/drizzle/schema";
import { getProductIdTag } from "@/features/products/db/cache";
import { userOwnsProduct } from "@/features/products/db/products";
import { wherePublicProducts } from "@/features/products/permissions/products";
import { getCurrentUser } from "@/features/users/db/users";
import StripeCheckoutForm from "@/services/stripe/components/StripeCheckoutForm";
import { and, eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

type PurchasePageProps = {
  params: Promise<{ productId: string }>;
};

export default function PurchasePage({ params }: PurchasePageProps) {
  return (
    <Suspense fallback={<LoadingSpinner className="my-6 size-36 mx-auto" />}>
      <SuspendedComponent params={params} />
    </Suspense>
  );
}

async function SuspendedComponent({ params }: PurchasePageProps) {
  const { productId } = await params;
  const user = await getCurrentUser();
  const product = await getPublicProduct(productId);

  if (product == null) return notFound();

  if (user.id != null) {
    if (await userOwnsProduct({ userId: user.id, productId })) {
      redirect("/courses");
    }

    return (
      <div className="container my-6">
        <StripeCheckoutForm product={product} user={user} />
      </div>
    );
  }

  return (
    <div className="container my-6 flex flex-col items-center">
      <PageHeader title="You need an account to make a purchase" />
    </div>
  );
}

async function getPublicProduct(id: string) {
  "use cache";
  cacheTag(getProductIdTag(id));

  return db.query.ProductTable.findFirst({
    columns: {
      name: true,
      id: true,
      imageUrl: true,
      description: true,
      priceInDollars: true,
    },
    where: and(eq(ProductTable.id, id), wherePublicProducts),
  });
}
