
const Users = ({user, handleDelete}) => {

    const userData = user;
    
    return (
        <>
            <tr>
                    
                <td>
                    <input type="hidden" id="userId" name="id" value = "" />
                    <span className="custom-checkbox">
                        <input type="checkbox" id="data_checkbox" className="data_checkbox" name="data_checkbox" value=""/>
                        <label htmlFor="data_checkbox"></label>
                    </span>
                </td>

                <td>{userData.username}</td>
                <td>{userData.email}</td>

                <td>
                    <a href="#editEmployeeModal" className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                    <a href="#deleteEmployeeModal" className="delete" onClick={()=>handleDelete(userData.id)} data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                </td>
            </tr>
        </>
    )
}

export default Users;