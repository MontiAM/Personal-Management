import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SelectTransaction from "./SelectTransaction";

function ModalCharge({ onClose, refreshData, editValue }) {
  const { data: session } = useSession();
  const [transactionsCategories, setTransactionsCategories] = useState([]);
  const [transactionsType, setTransactionsType] = useState([]);
  const [patmentMethod, setPatmentMethod] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {

    const method = editValue ? "PUT" : "POST";
    const url = editValue
      ? `/api/transactions/${editValue.trans_id}`
      : "/api/transactions";

    const res = await fetch(url, {
      method,
      body: JSON.stringify({
        trans_cat_id: parseInt(data.trans_cat_id),
        trans_date: data.trans_date,
        trans_amount: parseInt(data.trans_amount),
        trans_description: data.trans_description,
        trans_payment_method_id: parseInt(data.trans_payment_method_id),
        trans_user_id: session.user.email,
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
  });

  const getTransactionType = async () => {
    const res = await fetch("/api/transaction_type");
    const data = await res.json();
    setTransactionsType(data.data);
  };

  const getPaymentMethod = async () => {
    const res = await fetch("/api/payment_methods");
    const data = await res.json();

    setPatmentMethod(data.data);
  };

  const getTransactionCategory = async (typeId) => {
    const res = await fetch(`/api/transaction_category/by_type/${typeId}`);
    const data = await res.json();
    setTransactionsCategories(data.data);
  };

  const handleSelect = (e) => {
    const selectedTypeId = e.target.value;
    getTransactionCategory(selectedTypeId);
  };

  useEffect(() => {
    getTransactionType();
    getPaymentMethod();
  }, []);
  useEffect(() => {
    if (editValue && transactionsCategories.length > 0) {
      setValue("trans_cat_trans_type_id", editValue.l_trans_type_id);
      setValue("trans_cat_id", editValue.trans_cat_id);
      setValue("trans_date", editValue.trans_date);
      setValue("trans_amount", editValue.trans_amount);
      setValue("trans_description", editValue.trans_description);
      setValue("trans_payment_method_id", editValue.trans_payment_method_id);
    }
  }, [editValue, transactionsCategories, setValue]);

  useEffect(() => {
    if (editValue && editValue.l_trans_type_id) {
      getTransactionCategory(editValue.l_trans_type_id);
    }
  }, [editValue]);

  return (
    <>
      <form action="" onSubmit={onSubmit}>
        <h1 className="text-slate-200 font-bold text-3xl mb-4 col-span-full">
          {editValue ? "Edit" : "Charge"} transaction
        </h1>

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
                onChange: (e) => {
                  handleSelect(e);
                },
              })}
              className="p-2 rounded bg-slate-900 text-slate-300 w-full"
            >
              {transactionsType &&
                transactionsType.map((type) => (
                  <option key={type.trans_type_id} value={type.trans_type_id}>
                    {type.trans_type_name}
                  </option>
                ))}
            </select>
          </div>
          {errors.trans_cat_trans_type_id && (
            <span className="text-red-500 text-sm">
              {errors.trans_cat_trans_type_id.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="trans_cat_id"
            className="text-slate-500 mb-2 block text-sm"
          >
            Transaction category:
          </label>
          <div className="pb-2 flex items-center space-x-2">
            <select
              {...register("trans_cat_id", {
                required: {
                  value: true,
                  message: "Transaction category is required",
                },
              })}
              className="p-2 rounded bg-slate-900 text-slate-300 w-full"
            >
              {transactionsCategories &&
                transactionsCategories.map((type) => (
                  <option key={type.trans_cat_id} value={type.trans_cat_id}>
                    {type.trans_cat_name}
                  </option>
                ))}
            </select>
          </div>
          {errors.trans_cat_id && (
            <span className="text-red-500 text-sm">
              {errors.trans_cat_id.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="trans_date"
            className="text-slate-500 mb-2 block text-sm"
          >
            Date:
          </label>
          <input
            type="date"
            placeholder="DD/MM/YYYY"
            {...register("trans_date", {
              required: {
                value: true,
                message: "Date is required",
              },
            })}
            className="p-2 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          />
          {errors.trans_date && (
            <span className="text-red-500 text-sm">
              {errors.trans_date.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="trans_amount"
            className="text-slate-500 mb-2 block text-sm"
          >
            Amount:
          </label>
          <input
            type="number"
            placeholder="Amount"
            {...register("trans_amount", {
              required: {
                value: true,
                message: "Amount is required",
              },
            })}
            className="p-2 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          />
          {errors.trans_amount && (
            <span className="text-red-500 text-sm">
              {errors.trans_amount.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="trans_description"
            className="text-slate-500 mb-2 block text-sm"
          >
            Description:
          </label>
          <input
            type="text"
            placeholder="Description"
            {...register("trans_description", {
              required: {
                value: false,
                message: "Description is required",
              },
            })}
            className="p-2 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          />
          {errors.trans_description && (
            <span className="text-red-500 text-sm">
              {errors.trans_description.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="trans_payment_method_id"
            className="text-slate-500 mb-2 block text-sm"
          >
            Payment Method:
          </label>
          <div className="pb-2 flex items-center space-x-2">
            <select
              {...register("trans_payment_method_id", {
                required: {
                  value: true,
                  message: "Payment method is required",
                },
              })}
              className="p-2 rounded bg-slate-900 text-slate-300 w-full"
            >
              {patmentMethod &&
                patmentMethod.map((type) => (
                  <option key={type.pay_method_id} value={type.pay_method_id}>
                    {type.pay_method_name}
                  </option>
                ))}
            </select>
          </div>
          {errors.trans_payment_method_id && (
            <span className="text-red-500 text-sm">
              {errors.trans_payment_method_id.message}
            </span>
          )}
        </div>

        <button className="w-full rounded-lg text-white bg-blue-500 p-2 mt-2 col-span-full">
          Submit transaction
        </button>
      </form>
    </>
  );
}

export default ModalCharge;
