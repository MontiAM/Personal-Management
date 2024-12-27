import ManageParameter from "./ManageParameter";

export default function Parameters() {
  return (
    <>
      <h1 className="mb-2 text-lg sm:text-xl font-bold text-white">
        Parameters
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        <ManageParameter
          title={"Transactions Category"}
          type="transaction_category"
        />

        <ManageParameter title={"Transactions Type"} type="transaction_type" />

        <ManageParameter title={"Payments Method"} type="payment_methods" />
      </div>
    </>
  );
}
