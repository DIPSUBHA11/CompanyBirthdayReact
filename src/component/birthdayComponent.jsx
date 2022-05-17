import React, { useRef, useState } from 'react'

const defaultState = {
    employeeid: '',
    employeename: '',
    filename: '',
    employeeBirthday: '',
    dateofjoining: '',
    clientid: ''
}
const defaultTemplateState={
    templateId:"",
    templatename:""

}
const BirthDayForm = () => {
    const[templateDetails,settemplateDetails]=useState(defaultTemplateState)
    const [employeeDetails, SetEmployeeDetails] = useState(defaultState)
    const fileInputRef = useRef();
    const TempaltefileInputRef=useRef();
    const handleinput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        SetEmployeeDetails({ ...employeeDetails, [name]: value })
    }
    const handletemplateinput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        settemplateDetails({ ...templateDetails, [name]: value })
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
        await fetch('http://localhost:8208/upload', {
            method: 'POST',
            body: data
        }).
            then(res => {
                if (res.status === 200)
                    SetEmployeeDetails(defaultState)
            })
    }
    const handleTemplateSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append('ImageFile', TempaltefileInputRef.current.files[0])
        data.append('id', templateDetails.templateId)
        await fetch('http://localhost:8208/templateData', {
            method: 'POST',
            body: data
        }).
            then(res => {
                if (res.status === 200)
                settemplateDetails(defaultTemplateState)
            })
    }
    return (
        <>
            <div>
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
                        <label>Date Of JoinIng</label>
                        <input type="date" id="dateofjoining" name="dateofjoining" value={employeeDetails.dateofjoining} onChange={handleinput}></input>
                        <label>Client id</label>
                        <input type="text" id="clientid" name="clientid" autoComplete="off" placeholder="Enter the id" value={employeeDetails.clientid} onChange={handleinput} />
                        <small></small>
                    </div>
                    <input ref={fileInputRef} type="file" name="filename" accept="image/x-png, image/gif, image/jpeg" value={employeeDetails.filename} onChange={handleinput} />
                    <input type="submit" value="submit" />
                </form>
            </div>
            <div>
                <form method="post" onSubmit={handleTemplateSubmit} encType="multipart/form-data">
                    <h2>Enter Template</h2>
                    <label>Id No-:</label>
                    <input type="text" id="id_name" name="templateId" autoComplete="off" placeholder="Enter the id" value={templateDetails.templateId} onChange={handletemplateinput} />
                    <small></small>
                    <input ref={TempaltefileInputRef} type="file" name="templatename" accept="image/x-png, image/gif, image/jpeg" value={templateDetails.templatename} onChange={handletemplateinput} />
                    <input type="submit" value="submit" />
                </form>
            </div>
        </>
    )
}

export default BirthDayForm