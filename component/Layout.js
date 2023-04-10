import {useContext, useState} from "react";

import Alert from "./Alert";
import UsersTable from "./UsersTable";
import Pagination from "./Pagination";
import Navbar from "./Navbar";
import AppContext from "../context/appContext";

import { Paginate } from "../helpers/paginate";
import { Search } from "../helpers/search";


const Layout = () => {

    const value = useContext(AppContext);

    const [saveUser, setSaveUser] = useState({
        username : "",
        email : ""
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const onPageChange = (page) => {
        setCurrentPage(page); 
    }

    let searchedResult;
    let paginatedUsers;

    if (searchQuery.length > 0) {
        searchedResult = Search(value.users.users, searchQuery);
        paginatedUsers = Paginate(searchedResult, currentPage, pageSize);
    } else {
        paginatedUsers = Paginate(value.users.users, currentPage, pageSize);
    }

    const handleSaveChange = ({target : {name, value}}) => {
        setSaveUser({...saveUser, [name] : value});
    }
    
    const handleAddSubmit = async (e) => {
        e.preventDefault();

        const reqOption = {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(saveUser)
        }


        const response = await fetch("http://localhost:3000/api/users/", reqOption);
        const result = await response.json();

        setSaveUser({ username : "",email : ""})

        if(result) {
            document.getElementsByClassName("addCancel")[0].click();
            const prevUsers = value.users;
            prevUsers['users'].push(result);
            
            value.setMyUsers(prevUsers); // set new Value on AppContext  
        }

    }

    const handleDelete = async (userId) => {

        var reqOption = {
            method : "DELETE"
        }
        
        var response = await fetch("http://localhost:3000/api/users/"+userId, reqOption);
        var result = await response.json();

        if (result) { 
            var prevUsers = value.users; 
            var newUser = prevUsers['users'].filter(user=>{
                return user.id != userId;
            })
            
            value.setMyUsers({users : newUser}); // set new Value on AppContext   
        }


    }
    
    return (
        <>
            <div className="container-xl">
                <div className="table-responsive d-flex flex-column">
                        
                    <Alert/>
                    <div className="table-wrapper">
                        <Navbar 
                            searchQuery = {searchQuery}
                            setSearchQuery = {setSearchQuery}
                        />

                        <UsersTable 
                            users = {paginatedUsers}
                            handleDelete = {handleDelete}
                        />

                        <Pagination 
                            usersCount = {searchQuery.length > 0 ? searchedResult.length : value.users.users.length}
                            currentPage = {currentPage}
                            pageSize = {pageSize}
                            onPageChange = {onPageChange}
                        />
                    </div>
                </div>        
            </div>

        
            <div id="addEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleAddSubmit} >
                            <div className="modal-header">						
                                <h4 className="modal-title">Add Employee</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div className="modal-body">					
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" value={saveUser.username} onChange={handleSaveChange} className="form-control" name="username" required/>
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" value={saveUser.email} onChange={handleSaveChange}  className="form-control" name="email" required/>
                                </div>				
                            </div>
                            <div className="modal-footer">
                                <input type="button" className="btn btn-default addCancel" name="submit" data-dismiss="modal" value="Cancel"/>
                                <input type="submit" className="btn btn-success" value="Add"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div id="editEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form action = "#" method = "POST">
                            <div className="modal-header">						
                                <h4 className="modal-title">Edit Employee</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div className="modal-body">
                                <input type="hidden" name="updateId" className = "updateId" />					
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control updateUsername" name = "username" required/>
                                </div>
                                <div className="form-group">
                                    <label>password</label>
                                    <input type="text" className="form-control updatePassword" name = "password"  required/>
                                </div>			
                            </div>
                            <div className="modal-footer">
                                <input type="button" name = "submit" className="btn btn-default" data-dismiss="modal" value="Cancel"/>
                                <input type="submit" className="btn btn-info" value="Save"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout;