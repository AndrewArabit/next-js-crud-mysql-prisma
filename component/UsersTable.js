
import User from "./Users";


const UsersTable = ({users, handleDelete}) => {
    
   const generateUser = () => {
    
     return (
        <>
            {
                users.map(user => {
                    return (
                        <User key = {user.id} user = {user} handleDelete ={handleDelete}/>
                    )
                })
            }
        </>
     )
   }    


    return (
        <>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>
                            <span className="custom-checkbox">
                                <input type="checkbox" id="selectAll"/>
                                <label htmlFor="selectAll"></label>
                            </span>
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                     {generateUser()}
                </tbody>
            </table>
        </>
    )
}

export default UsersTable;