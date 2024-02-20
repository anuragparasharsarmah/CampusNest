import { hotelDepartment } from "../config/hotel-options-config";

type Props = {
    selectedDepartment: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const DepartmentFilter = ({ selectedDepartment, onChange }: Props) => {
    return (
        <div className="border-b border-slate-300 pb-5">
            <h4 className="text-md font-semibold mb-2">Department</h4>
            {hotelDepartment.map((department) => (
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        className="rounded"
                        value={department}
                        checked={selectedDepartment.includes(department)}
                        onChange={onChange}
                    />
                    <span>{department}</span>
                </label>
            ))}
        </div>
    );
};

export default DepartmentFilter;
