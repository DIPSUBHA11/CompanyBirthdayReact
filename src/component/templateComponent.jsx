import React, { useRef, useState } from 'react'
const defaultTemplateState={
    templateId:"",
    templatename:""

}
const TemplateForm = () => {
    const[templateDetails,settemplateDetails]= useState(defaultTemplateState)
    const tempalteforegroundfileInputRef= useRef();
    const tempaltebackgroundfileInputRef= useRef();
    const tempalteplaceholderfileInputRef=useRef();
    const handletemplateinput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        settemplateDetails({ ...templateDetails, [name]: value })
    }
    const handleTemplateSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append('foregroundImage', tempalteforegroundfileInputRef.current.files[0])
        data.append('backgroungImage',tempaltebackgroundfileInputRef.current.files[0])
        data.append('placeholderImage', tempalteplaceholderfileInputRef.current.files[0])
        data.append('id', templateDetails.templateId)
        await fetch('http://10.139.166.21:8208/templateData', {
            method: 'POST',
            body: data
        }).then(res => {
            if (res.status === 200)
                settemplateDetails(defaultTemplateState)
        })
    }
    return (
       <>
        <form method="post" onSubmit={handleTemplateSubmit} encType="multipart/form-data">
            <h2>Template</h2>
            <label>Foreground Image</label>
            <input ref={tempalteforegroundfileInputRef} type="file" name="templatename" accept="image/x-png, image/gif, image/jpeg" value={templateDetails.templatename} onChange={handletemplateinput} />
            <label>Background Image</label>
            <input ref={tempaltebackgroundfileInputRef} type="file" name="templatename" accept="image/x-png, image/gif, image/jpeg" value={templateDetails.templatename} onChange={handletemplateinput} />
            <label>Placeholder Image</label>
            <input ref={tempalteplaceholderfileInputRef} type="file" name="templatename" accept="image/x-png, image/gif, image/jpeg" value={templateDetails.templatename} onChange={handletemplateinput} />
            <input type="submit" value="submit" />
        </form>
    </>
    )
}

export default TemplateForm