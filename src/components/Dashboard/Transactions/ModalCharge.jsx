import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SelectTransaction from "./SelectTransaction";

function ModalCharge({ onClose, refreshData, expense, filterType }) {
  const { data: session } = useSession();
  const [charge, setCharge] = useState("expenses");
  const [transactionsCategories, setTransactionsCategories] = useState([]);
  const [transactionsType, setTransactionsType] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (charge == "expenses") {
      const method = expense ? "PUT" : "POST";
      const url = expense
        ? `/api/expenses/${expense.expense_id}`
        : "/api/expenses";

      const res = await fetch(url, {
        method,
        body: JSON.stringify({
          expense_date: data.date,
          expense_category: data.category,
          expense_description: data.description,
          expense_amount: data.amount,
          expense_payment_method: data.payment_method,
          expense_location: null,
          expense_notes: data.notes,
          email_user: session.user.email,
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
    }

    if (charge == "incomes") {
      const method = expense ? "PUT" : "POST";
      const url = expense
        ? `/api/incomes/${expense.income_id}`
        : "/api/incomes";

      const res = await fetch(url, {
        method,
        body: JSON.stringify({
          income_date: data.date,
          income_category: data.category,
          income_description: data.description,
          income_amount: data.amount,
          income_source: data.payment_method,
          income_location: null,
          income_notes: data.notes,
          email_user: session.user.email,
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
    if (expense) {
      setCharge(filterType);
      if (filterType === "expenses") {
        setValue("username", expense.user.email);
        setValue("date", expense.expense_date);
        setValue("category", expense.expense_category);
        setValue("description", expense.expense_description);
        setValue("amount", expense.expense_amount);
        setValue("payment_method", expense.expense_payment_method);
        setValue("notes", expense.expense_notes);
      } else if (filterType === "incomes") {
        console.log(expense);

        setValue("username", expense.user.email);
        setValue("date", expense.income_date);
        setValue("category", expense.income_category);
        setValue("description", expense.income_description);
        setValue("amount", expense.income_amount);
        setValue("payment_method", expense.income_source);
        setValue("notes", expense.income_notes);
      }
    }
  }, [expense, setValue]);

  return (
    <>
      <form action="" onSubmit={onSubmit}>
        <h1 className="text-slate-200 font-bold text-4xl mb-4 col-span-full">
          {expense ? "Edit" : "Charge"} transaction
          {/* <SelectTransaction
            setCharge={setCharge}
            editValue={expense ? filterType : null}
          /> */}
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
              className="p-3 rounded bg-slate-900 text-slate-300 w-full"
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
                onChange: (e) => {
                  handleSelect(e);
                },
              })}
              className="p-3 rounded bg-slate-900 text-slate-300 w-full"
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


        {/* <div className="flex flex-col">
          <label
            htmlFor="category"
            className="text-slate-500 mb-2 block text-sm"
          >
            Category:
          </label>
          <div className="flex items-center space-x-2">
            <select
              {...register("category", {
                required: {
                  value: true,
                  message: "Category is required",
                },
              })}
              className="p-3 rounded bg-slate-900 text-slate-300 w-full"
            >
              {charge == "expenses" ? (
                <>
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Health">Health</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Other">Other</option>
                </>
              ) : (
                <>
                  <option value="Work">Work</option>
                  <option value="Others">Others</option>{" "}
                  <option value="Savings">Savings</option>
                </>
              )}
            </select>
          </div>
          {errors.category && (
            <span className="text-red-500 text-sm">
              {errors.category.message}
            </span>
          )}
        </div> */}

        {/* <div className="flex flex-col">
          <label htmlFor="date" className="text-slate-500 mb-2 block text-sm">
            Date:
          </label>
          <input
            type="date"
            placeholder="DD/MM/YYYY"
            {...register("date", {
              required: {
                value: true,
                message: "Date is required",
              },
            })}
            className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          />
          {errors.date && (
            <span className="text-red-500 text-sm">{errors.date.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-slate-500 mb-2 block text-sm"
          >
            Description:
          </label>
          <input
            type="text"
            placeholder="Description"
            {...register("description", {
              required: {
                value: false,
                message: "Description is required",
              },
            })}
            className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="amount" className="text-slate-500 mb-2 block text-sm">
            Amount:
          </label>
          <input
            type="number"
            placeholder="Amount"
            {...register("amount", {
              required: {
                value: true,
                message: "Amount is required",
              },
            })}
            className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          />
          {errors.amount && (
            <span className="text-red-500 text-sm">
              {errors.amount.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="payment_method"
            className="text-slate-500 mb-2 block text-sm"
          >
            {charge === "expenses" ? "Payment Method:" : "Source"}
          </label>
          <input
            type="text"
            placeholder="Credit Card"
            {...register("payment_method", {
              required: {
                value: true,
                message: "Payment method is required",
              },
            })}
            className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          />
          {errors.payment_method && (
            <span className="text-red-500 text-sm">
              {errors.payment_method.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="notes" className="text-slate-500 mb-2 block text-sm">
            Notes:
          </label>
          <input
            type="text"
            placeholder="Notes"
            {...register("notes", {
              required: {
                value: false,
                message: "Notes is required",
              },
            })}
            className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          />
          {errors.notes && (
            <span className="text-red-500 text-sm">{errors.notes.message}</span>
          )}
        </div> */}

        <button className="w-full rounded-lg text-white bg-blue-500 p-3 mt-2 col-span-full">
          {expense ? "Edit" : "Add"}{" "}
          {charge === "expenses" ? "expense" : "income"}
        </button>
      </form>
    </>
  );
}

export default ModalCharge;
