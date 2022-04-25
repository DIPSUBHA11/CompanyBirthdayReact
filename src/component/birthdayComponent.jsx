import React, { useRef, useState } from 'react'

const defaultState = {
    employeeid: '',
    employeename: '',
    filename: '',
    employeeBirthday:''
}

const BirthDayForm = () => {
    const [employeeDetails, SetEmployeeDetails] = useState(defaultState)
    const fileInputRef = useRef();
    const handleinput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        SetEmployeeDetails({ ...employeeDetails, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append('ImageFile', fileInputRef.current.files[0])
        data.append('name', employeeDetails.employeename)
        data.append('id', employeeDetails.employeeid)
        data.append('birthday',employeeDetails.employeeBirthday)
        await fetch('http://localhost:4104/upload', {
            method: 'POST',
            body: data
        }).
            then(res => {
                if (res.status === 200)
                    SetEmployeeDetails(defaultState)
            })
    }
    return (
        <>
            <form method="post" onSubmit={handleSubmit} encType="multipart/form-data">
                <h1>Enter Employee details</h1>
                <div className="field">
                    <label>Id No-:</label>
                    <input type="text" id="id_name" name="employeeid" autoComplete="off" placeholder="Enter the id" value={employeeDetails.employeeid} onChange={handleinput} />
                    <small></small>
                    <label>Name:</label>
                    <input type="text" id="fname" name="employeename" autoComplete="off" placeholder="Enter the name" value={employeeDetails.employeename} onChange={handleinput} />
                    <small></small>
                    <label>Birthday:</label>
                    <input type="date" id="birthday" name="employeeBirthday" value={employeeDetails.employeeBirthday} onChange={handleinput}></input>
                </div>
                <input ref={fileInputRef} type="file" name="filename" accept="image/x-png, image/gif, image/jpeg" value={employeeDetails.filename} onChange={handleinput} />
                <input type="submit" value="submit" />
            </form>
        </>
    )
}

export default BirthDayForm