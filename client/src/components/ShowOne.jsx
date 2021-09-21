import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const ShowOne = () => {

    const { id } = useParams();
    const [petInfo, setPetInfo] = useState({})
    const history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${id}`)
            .then(res => {
                console.log("response for showone-->", res)
                setPetInfo(res.data.results)
            })
            .catch(err => console.log("err ", err))
    }, [id])

    const adoptHandler = () => {
        // console.log('delete stufvfv')
        axios.delete(`http://localhost:8000/api/pets/${petInfo._id}`)
            .then(res => {
                console.log("response after delete", res)
                history.push("/")
            })
            .catch(err => console.log("errrrrrrr ", err))
    }


    return (
        <>
        <p><Link to= {`/`}>back to home</Link></p>
            <div className="d-flex justify-content-between">
                <h3>Details about: {petInfo.name}</h3>
                <p><button onClick={adoptHandler} className="btn btn-danger">Adopt {petInfo.name}</button></p>
            </div>
            <div>
                <table class="table table-borderless ">
                    <tbody>
                        <tr>
                            <td>Pet Type:</td>
                            <td>{petInfo.type}</td>
                        </tr>
                        <tr>
                            <td>Description:</td>
                            <td>{petInfo.description}</td>
                        </tr>
                        <tr>
                            <td>Skills:</td>
                            <td>{petInfo.skill1}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>{petInfo.skill2}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>{petInfo.skill3}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};



export default ShowOne;