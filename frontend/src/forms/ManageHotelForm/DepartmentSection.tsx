import { useFormContext } from "react-hook-form";
import { hotelDepartment } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const DepartmentSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<HotelFormData>();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Roommate Department</h2>
            <div className="grid grid-cols-5 gap-3">
                {hotelDepartment.map((department) => (
                    <label className="text-sm flex gap-1 text-gray-700">
                        <input
                            type="checkbox"
                            value={department}
                            {...register("department", {
                                validate: (department) => {
                                    if (department && department.length > 0) {
                                        return true;
                                    } else {
                                        return "At least one department is required";
                                    }
                                },
                            })}
                        />
                        {department}
                    </label>
                ))}
            </div>
            {errors.department && (
                <span className="text-red-500 text-sm font-bold">
                    {errors.department.message}
                </span>
            )}
        </div>
    );
};

export default DepartmentSection;