import React, { useRef, useState } from 'react'

const defaultState = {
    employeeid: '',
    employeename: '',
    filename: '',
    employeeBirthday: '',
    dateofjoining: '',
    clientid: ''
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
        data.append('birthday', employeeDetails.employeeBirthday)
        data.append('doj', employeeDetails.dateofjoining)
        data.append('client_id', employeeDetails.clientid)
        await fetch('http://10.139.166.21:8208/upload', {
            method: 'POST',
            body: data
        }).then(res => {
            if (res.status === 200)
                SetEmployeeDetails(defaultState)
        })
    }
    return (
        <>
            <div className='birthday_form'>
                <form method="post" onSubmit={handleSubmit} encType="multipart/form-data">
                    <h1 className='text-center'>Enter Employee details</h1>
                    <div className="field">
                        <div>
                            <label>Id No :</label>
                            <input type="text" id="id_name" name="employeeid" autoComplete="off" placeholder="Enter the id" value={employeeDetails.employeeid} onChange={handleinput} />
                        </div>
                        {/* <small></small> */}
                        <div>
                            <label>Name :</label>
                            <input type="text" id="fname" name="employeename" autoComplete="off" placeholder="Enter the name" value={employeeDetails.employeename} onChange={handleinput} />
                        </div>
                        {/* <small></small> */}
                        <div>
                            <label>Birthday :</label>
                            <input type="date" id="birthday" name="employeeBirthday" value={employeeDetails.employeeBirthday} onChange={handleinput}></input>
                        </div>
                        <div>
                            <label>Date Of JoinIng :</label>
                            <input type="date" id="dateofjoining" name="dateofjoining" value={employeeDetails.dateofjoining} onChange={handleinput}></input>
                        </div>
                        <div>
                            <label>Client id :</label>
                            <input type="text" id="clientid" name="clientid" autoComplete="off" placeholder="Enter the id" value={employeeDetails.clientid} onChange={handleinput} />
                        </div>
                        {/* <small></small> */}
                        <div>
                            <label>Select Image :</label>
                            <input ref={fileInputRef} type="file" name="filename" accept="image/x-png, image/gif, image/jpeg" value={employeeDetails.filename} onChange={handleinput} />
                        </div>
                        <div className='submitButton'>
                            <input type="submit" value="submit" />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default BirthDayForm