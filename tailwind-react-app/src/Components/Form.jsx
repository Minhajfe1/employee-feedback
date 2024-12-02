import { useForm } from "react-hook-form";
import InvexTech from "../assets/InvexTech.svg";
import ratfill1 from "../assets/ratfill1.png";
import ratfill2 from "../assets/ratfill2.png";
import ratfill3 from "../assets/ratfill3.png";
import ratfill4 from "../assets/ratfill4.png";
import ratfill5 from "../assets/ratfill5.png";
import rat1 from "../assets/rat1.png";
import rat2 from "../assets/rat2.png";
import rat3 from "../assets/rat3.png";
import rat4 from "../assets/rat4.png";
import rat5 from "../assets/rat5.png";
import { toast } from "react-toastify";

const FeedbackForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      designation: "",
      email: "",
      joiningDate: "",
      workEnvironment: "Excellent",
      feedback: "",
      rating: "Excellent",
    },
  });

  const watchAllFields = watch();

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    reset();

    fetch("/zapier-webhook/hooks/catch/20831720/2isrrbc/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Data successfully sent to Zapier:", responseData);
      })
      .catch((error) => {
        console.error("Error sending data to Zapier:", error);
      });
    toast.success("Thanks For Your Feedback !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleClear = () => {
    reset();
  };

  const designations = [
    "Frontend Developer",
    "Backend Developer",
    "FullStack Developer",
    "WordPress Developer",
    "Business Analyst",
    "Internship",
    "SEO Expert",
  ];

  return (
    <div className="w-full max-w-3xl my-10 mx-auto bg-white p-8 rounded-xl shadow-lg ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center mb-10">
          <img
            src={InvexTech}
            alt="Logo"
            className="h-24 w-52 border-b-4 border-[#42a9c4]"
          />
        </div>

        <div className="flex space-x-4 mb-6">
          <div className="w-full">
            <label
              htmlFor="name"
              className="block text-sm text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Name must contain only letters and spaces",
                },
              })}
              className="w-full capitalize px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#42a9c4] text-md"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1" aria-live="polite">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <label
              htmlFor="email"
              className="block text-sm text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#42a9c4] text-md"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1" aria-live="polite">
                {errors.email.message}
              </p>
            )}
          </div>{" "}
        </div>

        <div className="flex space-x-4 mb-6">
          <div className="w-full">
            <label
              htmlFor="designation"
              className="block text-sm text-gray-700 font-medium mb-2"
            >
              Designation
            </label>
            <div className="relative">
              <select
                {...register("designation", {
                  required: "Designation is required",
                })}
                className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#42a9c4] appearance-none"
              >
                <option value="">Select Designation</option>
                {designations.map((designation, index) => (
                  <option key={index} value={designation}>
                    {designation}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#42a9c4] pointer-events-none">
                &#x25BC;
              </span>
            </div>
            {errors.designation && (
              <p className="text-red-500 text-sm mt-1" aria-live="polite">
                {errors.designation.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <label
              htmlFor="joiningDate"
              className="block text-sm text-gray-700 font-medium mb-2"
            >
              Joining Date
            </label>
            <input
              type="date"
              {...register("joiningDate", {
                required: "Joining date is required",
                validate: {
                  notFutureDate: (value) => {
                    const selectedDate = new Date(value);
                    const currentDate = new Date();
                    currentDate.setHours(0, 0, 0, 0);
                    return (
                      selectedDate <= currentDate ||
                      "Joining date cannot be in the future"
                    );
                  },
                },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#42a9c4] text-md"
            />
            {errors.joiningDate && (
              <p className="text-red-500 text-sm mt-1" aria-live="polite">
                {errors.joiningDate.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex space-x-4 mb-6">
          <div className="w-full">
            <label
              htmlFor="workEnvironment"
              className="block text-sm text-gray-700 font-medium mb-2"
            >
              Work Environment
            </label>
            <div className="flex space-x-4">
              {[
                "Excellent",
                "Good",
                "Moderate",
                "Slight Better",
                "Need To Improve",
              ].map((option) => (
                <span
                  key={option}
                  onClick={() => setValue("workEnvironment", option)}
                  className={`px-4 py-2 whitespace-nowrap rounded-full cursor-pointer text-sm font-medium ${
                    watchAllFields.workEnvironment === option
                      ? "bg-[#42a9c4] text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {option}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="feedback"
            className="flex justify-start text-sm text-gray-700 font-medium mb-2 mt-8"
          >
            Feedback:
          </label>
          <textarea
            {...register("feedback", {
              required: "Feedback is required",
            })}
            rows="4"
            className="w-full h-28 capitalize px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#42a9c4]"
          />
          {errors.feedback && (
            <p className="text-red-500 text-sm mt-1">
              {errors.feedback.message}
            </p>
          )}
        </div>
{/* tset */}
        <div className="flex flex-col items-center space-y-2">
          <label
            htmlFor="rating"
            className="block text-sm text-gray-700  font-semibold mb-2"
          >
            Rating:
          </label>

          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((starValue) => {
                const ratings = {
                  1: { unfilled: rat1, filled: ratfill1, value: "Excellent" },
                  2: {
                    unfilled: rat2,
                    filled: ratfill2,
                    value: "Very Satisfied",
                  },
                  3: { unfilled: rat3, filled: ratfill3, value: "Satisfied" },
                  4: {
                    unfilled: rat4,
                    filled: ratfill4,
                    value: "Dissatisfied",
                  },
                  5: {
                    unfilled: rat5,
                    filled: ratfill5,
                    value: "Very Dissatisfied",
                  },
                };

                return (
                  <span
                    key={starValue}
                    onClick={() => setValue("rating", ratings[starValue].value)}
                    className="cursor-pointer"
                  >
                    <img
                      src={
                        watchAllFields.rating === ratings[starValue].value
                          ? ratings[starValue].filled
                          : ratings[starValue].unfilled
                      }
                      alt={`rating-${starValue}`}
                      className="h-10 w-10"
                    />
                  </span>
                );
              })}
            </div>
            {watchAllFields.rating && (
              <p className="mt-4 text-lg font-medium text-[#42a9c4]">
                {watchAllFields.rating}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-10">
          <button
            type="button"
            onClick={handleClear}
            className="w-32 font-semibold border text-red-500 border-red-500 py-2 px-6 rounded-lg hover:bg-red-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
          >
            Clear
          </button>
          <button
            type="submit"
            className="w-32 font-semibold bg-[#42a9c4] text-white py-2 px-6 rounded-lg hover:opacity-75 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
