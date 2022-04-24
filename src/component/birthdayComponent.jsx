import React, { useRef, useState } from 'react'

const defaultState = {
    employeeid:'',
    employeename: '',
    filename: ''
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
        const file = fileInputRef.current.files[0];
        const { url } = await fetch('http://localhost:4104/s3Url').then(res => res.json())
        console.log(url)
        await fetch(url, {
            method: 'put',
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: file
        })

        const imageURl = url.split('?')[0]
        const sendEmployeeDetails= {
            id:employeeDetails.employeeid,
            name: employeeDetails.employeename,
            imageUrl: imageURl
        }
        await fetch('http://localhost:4104/upload', {
            method: 'POST',
            body: JSON.stringify(sendEmployeeDetails),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
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
                </div>
                <input ref={fileInputRef} type="file" name="filename" accept="image/x-png, image/gif, image/jpeg" value={employeeDetails.filename} onChange={handleinput} />
                <input type="submit" value="submit" />
            </form>
        </>
    )
}

export default BirthDayForm