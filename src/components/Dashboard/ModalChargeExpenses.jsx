import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";

function ModalChargeExpenses() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <>
      <form
        action=""
        onSubmit={onSubmit}
        
      >
        <h1 className="text-slate-200 font-bold text-4xl mb-4 col-span-full">
          Charge Expenses
        </h1>

        <div className="flex flex-col">
          <label
            htmlFor="username"
            className="text-slate-500 mb-2 block text-sm"
          >
            Username:
          </label>
          <input
            type="text"
            placeholder="YourUser123"
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
            className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
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
              <option value="">Select a category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Utilities">Utilities</option>
              <option value="Other">Other</option>
            </select>
            <button
              type="button"
              className="rounded-lg text-white bg-blue-500 p-3 focus:outline-none focus:ring-2"
              onClick={() => {
                console.log("Add new category");
              }}
            >
              Add
            </button>
          </div>
          {errors.category && (
            <span className="text-red-500 text-sm">
              {errors.category.message}
            </span>
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
            Payment Method:
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
        </div>
        <button className="w-full rounded-lg text-white bg-blue-500 p-3 mt-2 col-span-full">
          Add charge
        </button>

      </form>
    </>
  );
}

export default ModalChargeExpenses;
