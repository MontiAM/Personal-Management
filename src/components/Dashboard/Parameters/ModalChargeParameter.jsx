import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SelectModalTransactions from "./SelectModalTransactions";

function ModalChargeParameter({ onClose, refreshData, editValue, filterType }) {
  const { data: session } = useSession();
  const [charge, setCharge] = useState(filterType ? filterType : "");
  const [transactionsType, setTransactionsType] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    let method;
    let url;
    let res;

    switch (charge) {
      case "payment_methods":
        console.log(editValue);

        method = editValue ? "PUT" : "POST";
        url = editValue
          ? `/api/payment_methods/${editValue.pay_method_id}`
          : "/api/payment_methods";

        res = await fetch(url, {
          method,
          body: JSON.stringify({
            pay_method_name: data.pay_method_name,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          refreshData();
          reset();
          onClose();
        } else {
          const errorData = await res.json();
          console.error("Error:", errorData.message);
        }
        break;

      case "transaction_type":
        method = editValue ? "PUT" : "POST";
        url = editValue
          ? `/api/transaction_type/${editValue.trans_type_id}`
          : "/api/transaction_type";

        res = await fetch(url, {
          method,
          body: JSON.stringify({
            trans_type_name: data.trans_type_name,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          refreshData();
          reset();
          onClose();
        } else {
          const errorData = await res.json();
          console.error("Error:", errorData.message);
        }
        break;

      case "transaction_category":
        method = editValue ? "PUT" : "POST";
        url = editValue
          ? `/api/transaction_category/${editValue.trans_cat_id}`
          : "/api/transaction_category";

        res = await fetch(url, {
          method,
          body: JSON.stringify({
            trans_cat_name: data.trans_cat_name,
            trans_cat_trans_type_id: data.trans_cat_trans_type_id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          refreshData();
          reset();
          onClose();
        } else {
          const errorData = await res.json();
          console.error("Error:", errorData.message);
        }
        break;

      default:
        break;
    }
  });

  const getTransactionType = async () => {
    const res = await fetch("/api/transaction_type");
    const data = await res.json();
    setTransactionsType(data.data);
  };

  useEffect(() => {
    getTransactionType();
  }, []);

  useEffect(() => {
    if (editValue) {
      switch (filterType) {
        case "transaction_category":
          setValue("trans_cat_id", editValue.trans_cat_id);
          setValue("trans_cat_name", editValue.trans_cat_name);
          setValue(
            "trans_cat_trans_type_id",
            editValue.trans_cat_trans_type_id
          );
          setValue("l_trans_type_name", editValue.l_trans_type_name);
          break;
        case "payment_methods":
          setValue("pay_method_id", editValue.pay_method_id);
          setValue("pay_method_name", editValue.pay_method_name);
          break;
        case "transaction_type":
          setValue("trans_type_id", editValue.trans_type_id);
          setValue("trans_type_name", editValue.trans_type_name);
          break;
        default:
          break;
      }
    }
  }, [editValue, setValue]);

  return (
    <>
      <form action="" onSubmit={onSubmit}>
        <h1 className="text-slate-200 font-bold text-3xl mb-4 col-span-full">
          {editValue ? "Edit" : "Charge"} parameter
          <SelectModalTransactions
            setCharge={setCharge}
            editValue={filterType}
          />
        </h1>

        {filterType === "transaction_category" ? (
          <>
            <div className="flex flex-col">
              <label
                htmlFor="trans_cat_name"
                className="text-slate-500 mb-2 block text-sm"
              >
                Transaction category name:
              </label>
              <input
                type="text"
                placeholder="Transaction category"
                {...register("trans_cat_name", {
                  required: {
                    value: true,
                    message: "Transaction category is required",
                  },
                })}
                className="p-2 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
              />
              {errors.trans_cat_name && (
                <span className="text-red-500 text-sm">
                  {errors.trans_cat_name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="trans_cat_trans_type_id"
                className="text-slate-500 mb-2 block text-sm"
              >
                Transaction type:
              </label>
              <div className="pb-2 flex items-center space-x-2">
                <select
                  {...register("trans_cat_trans_type_id", {
                    required: {
                      value: true,
                      message: "Transaction type is required",
                    },
                  })}
                  className="p-2 rounded bg-slate-900 text-slate-300 w-full"
                >
                  {transactionsType &&
                    transactionsType.map((type) => (
                      <option
                        key={type.trans_type_id}
                        value={type.trans_type_id}
                      >
                        {type.trans_type_name}
                      </option>
                    ))}
                </select>
              </div>
              {errors.category && (
                <span className="text-red-500 text-sm">
                  {errors.category.message}
                </span>
              )}
            </div>
          </>
        ) : filterType === "transaction_type" ? (
          <>
            <div className="flex flex-col">
              <label
                htmlFor="trans_type_name"
                className="text-slate-500 mb-2 block text-sm"
              >
                Transaction name:
              </label>
              <input
                type="text"
                placeholder="Transaction name"
                {...register("trans_type_name", {
                  required: {
                    value: true,
                    message: "Transaction name is required",
                  },
                })}
                className="p-2 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
              />
              {errors.trans_type_name && (
                <span className="text-red-500 text-sm">
                  {errors.trans_type_name.message}
                </span>
              )}
            </div>
          </>
        ) : filterType === "payment_methods" ? (
          <>
            <div className="flex flex-col">
              <label
                htmlFor="pay_method_name"
                className="text-slate-500 mb-2 block text-sm"
              >
                Payment method name:
              </label>
              <input
                type="text"
                placeholder="Payment method"
                {...register("pay_method_name", {
                  required: {
                    value: true,
                    message: "Payment method is required",
                  },
                })}
                className="p-2 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
              />
              {errors.pay_method_name && (
                <span className="text-red-500 text-sm">
                  {errors.pay_method_name.message}
                </span>
              )}
            </div>
          </>
        ) : null}
        <button className="w-full rounded-lg text-white bg-blue-500 p-2 mt-2 col-span-full">
          Add
        </button>
      </form>
    </>
  );
}

export default ModalChargeParameter;
