import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


const ShowAll = () => {

    const [allPets, setAllPets] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/api/pets")
            .then(res => {
                console.log(res.data.results)
                const myData = res.data.results
                const resss = myData.sort(function (a, b) {
                    var nameA = a.type.toUpperCase(); // ignore upper and lowercase
                    var nameB = b.type.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    // names must be equal
                    return 0;
                })
                console.log(resss)
                setAllPets(resss)
            })
            .catch(err => console.log("ERRORRRR-->", err))
    }, [])


    return (
        <>
            <div className="d-flex justify-content-between">
                <h3 className="mt-3">These pets are looking for a good home</h3>
                <Link to={`/pets/new`}>add a pet to the shelter</Link>
            </div>
            <table className="table table-striped table-bordered mt-3">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {allPets.map((p, i) => {
                        return <>
                            <tr>
                                <td>{p.name}</td>
                                <td>{p.type}</td>
                                <td><Link to={`/pets/${p._id}`}>details</Link> | <Link to={`/pets/${p._id}/edit`}>edit</Link></td>
                            </tr>
                        </>
                    })}

                </tbody>
            </table>
        </>
    );
};


export default ShowAll;