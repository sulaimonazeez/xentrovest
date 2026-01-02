import React from "react";

const UserTable = ({ data, onDelete, handleEdit }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-light">No data found</p>;
  }

  // Dynamically get keys from first object
  const excludeFields = ["_id", "__v", "password", "user"];
  const tableHeaders = Object.keys(data[0]).filter(
    (key) => !excludeFields.includes(key)
  );

  return (
    <div className="table-responsive">
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            {tableHeaders.map((header) => (
              <th key={header} className="text-capitalize">{header}</th>
            ))}
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td><input type="checkbox" /></td>
              {tableHeaders.map((header) => (
                <td key={header}>
                  {typeof item[header] === "object"
                    ? JSON.stringify(item[header])
                    : item[header]}
                </td>
              ))}
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;