import React, { useRef, useState } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const defaultTemplateState = {
    templateId: "",
    templatename: ""

}
const TemplateForm = () => {
    const [templateDetails, settemplateDetails] = useState(defaultTemplateState)
    const tempalteforegroundfileInputRef = useRef();
    const tempaltebackgroundfileInputRef = useRef();
    const tempalteplaceholderfileInputRef = useRef();
    const options = [
        'one', 'two', 'three'
    ];
    const defaultOption = options[0];
    const handletemplateinput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        settemplateDetails({ ...templateDetails, [name]: value })
    }
    const handleTemplateSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append('foregroundImage', tempalteforegroundfileInputRef.current.files[0])
        data.append('backgroungImage', tempaltebackgroundfileInputRef.current.files[0])
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
    const selectCategory = (e) => {
        console.log(e)
    }
    return (
        <>
            <div className='template_form'>
                <form method="post" onSubmit={handleTemplateSubmit} encType="multipart/form-data">
                    <h2 className='text-center' >Template</h2>
                    <div style={{display:'flex'}}>
                        <label>Select Category</label>
                        <Dropdown options={options} onChange={selectCategory} value={defaultOption} placeholder="Select an option" />
                    </div>
                    <div className="field">
                        <div>
                            <label>Foreground Image</label>
                            <input ref={tempalteforegroundfileInputRef} type="file" name="templatename" accept="image/x-png, image/gif, image/jpeg" value={templateDetails.templatename} onChange={handletemplateinput} />
                        </div>
                        <div>
                            <label>Background Image</label>
                            <input ref={tempaltebackgroundfileInputRef} type="file" name="templatename" accept="image/x-png, image/gif, image/jpeg" value={templateDetails.templatename} onChange={handletemplateinput} />
                        </div>
                        <div>
                            <label>Placeholder Image</label>
                            <input ref={tempalteplaceholderfileInputRef} type="file" name="templatename" accept="image/x-png, image/gif, image/jpeg" value={templateDetails.templatename} onChange={handletemplateinput} />
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

export default TemplateForm