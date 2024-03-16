import { NavLink } from "react-router-dom";

const TableProduct = ({ data, handleDelete, handleBuy }) => {
  return (
    <div className="container-sm mx-auto w-4/5 mt-5 ">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Product</th>
              <th>stock</th>
              <th>price</th>
              <th>description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data.map((el, index) => (
              <tr key={el.id}>
                <th>
                  <label>{index + 1}</label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={el.imageUrl} alt="..." />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{el.name}</div>
                    </div>
                  </div>
                </td>
                <td>{el.rent} month</td>
                <td>{el.price}</td>
                <td>{el.released}</td>
                <td>
                  <div className="container gap-2 flex">
                    <button
                      className="btn btn-error rounded-full"
                      onClick={() => handleDelete(el.id)}
                    >
                      delete
                      {el.id}
                    </button>
                    <NavLink
                      to={`/updateCart/${el.id}`}
                      className="btn btn-warning rounded-full"
                    >
                      Edit
                    </NavLink>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

          {/* foot */}
        </table>
      </div>
      <div className="justify-end flex mt-5">
        <button className="btn btn-primary" onClick={handleBuy}>
          CheckOut
        </button>
      </div>
    </div>
  );
};
export default TableProduct;
