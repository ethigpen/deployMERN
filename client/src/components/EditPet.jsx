import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";
import { useParams } from "react-router";


const EditPet = () => {

    const { id } = useParams();
    const history = useHistory(); 
    const [petInfo, setPetInfo] = useState({})
    let [validationErrors, setValidationErrors] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${id}`)
            .then(res => {
                console.log("response for showone-->", res)
                setPetInfo(res.data.results)
            })
            .catch(err => console.log("errrrrrrr ", err))
    }, [])

    const changeHandler = (e)=>{
        // console.log(e.target.name, e.target.value)
        setPetInfo({ 
            ...petInfo,
            [e.target.name]:e.target.value
        })
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        console.log("submitted with this info-->", petInfo)
        axios.put(`http://localhost:8000/api/pets/${id}`, petInfo)
            .then(res=>{
                console.log("response after submitting post request-->", res)
                if(res.data.err){ 
                    setValidationErrors(res.data.err.errors)
                }else{ 
                    history.push(`/pets/${id}`)
                }
            })
            .catch(err=>console.log("error with form submit", err))
    }

    return (
        <>
            <div className="d-flex justify-content-between">
                <h3 className="mt-3">Know a pet needing a home?</h3>
                <Link to={`/`}>back to home</Link>
            </div>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label className="form-label">Pet Name:</label>
                    <input onChange={changeHandler} name="name" type="text" className="form-control" value={petInfo.name} />
                    <p className="text-danger">{validationErrors.name ? validationErrors.name.message : ""}</p>
                </div>
                <div className="mb-3">
                    <label className="form-label">Pet Type:</label>
                    <input onChange={changeHandler} name="type" type="text" className="form-control" value={petInfo.type}/>
                    <p className="text-danger">{validationErrors.type ? validationErrors.type.message : ""}</p>
                </div>
                <div className="mb-3">
                    <label className="form-label">Pet Description:</label>
                    <input onChange={changeHandler} name="description" type="text" className="form-control" value={petInfo.description}/>
                    <p className="text-danger">{validationErrors.description ? validationErrors.description.message : ""}</p>
                </div>
                <p>Skills (optional):</p>
                <div className="mb-3">
                    <label className="form-label">Skill 1:</label>
                    <input onChange={changeHandler} name="skill1" type="text" className="form-control" value={petInfo.skill1}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Skill 2:</label>
                    <input onChange={changeHandler} name="skill2" type="text" className="form-control" value={petInfo.skill2} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Skill 3:</label>
                    <input onChange={changeHandler} name="skill3" type="text" className="form-control" value={petInfo.skill3} />
                </div>
                <button type="submit" className="btn btn-primary">Edit Pet</button>
            </form>
        </>
    );
};



export default EditPet;