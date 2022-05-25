import React, { useEffect, useRef, useState } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const defaultTemplateState = {
    templateId: "",
    templatename: "",
    templatename2: "",
    templatename3: ""

}
const TemplateForm = () => {
    const [templateDetails, settemplateDetails] = useState(defaultTemplateState)
    const tempalteforegroundfileInputRef = useRef();
    const tempaltebackgroundfileInputRef = useRef();
    const tempalteplaceholderfileInputRef = useRef();
    const [options,setOptions] = useState([])
    const [category,getcategoty]= useState('')
    const [categoryId,setCategoryId]=useState('')
    const defaultOption = options[0];
    const handletemplateinput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        settemplateDetails({ ...templateDetails, [name]: value })
    }
    const handleTemplateSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append('templatename', tempalteforegroundfileInputRef.current.files[0])
        data.append('templatename2', tempaltebackgroundfileInputRef.current.files[0])
        data.append('templatename3', tempalteplaceholderfileInputRef.current.files[0])
        data.append('id', categoryId)
        await fetch('http://10.139.166.21/templateData', {
            method: 'POST',
            body: data
        }).then(res => {
            if (res.status === 200)
                settemplateDetails(defaultTemplateState)
        })
    }
    const selectCategory = (e) => {
        console.log(e.value)
        category.map((ele)=>{
            if(ele.event_category===e.value)
            {
                setCategoryId(ele._id)
                console.log(categoryId)
            }
        })
    }
    const getOptions = async ()=>{
        await fetch('http://10.139.166.21/get-event-categories',{
            method: 'GET'
        }).then(response => response.json())
        .then(data => {
            let option = data.categories.map((ele)=>{
                return ele.event_category
            })
            setOptions(option)
            getcategoty(data.categories)
        })
    }
    useEffect(()=>{
        getOptions()
    },[])
    return (
        <>
            <div className='template_form'>
                <form method="post" onSubmit={handleTemplateSubmit} encType="multipart/form-data">
                    <h2 className='text-center' >Template</h2>
                    <div style={{display:'flex'}}>
                        <label>Select Category</label>
                        <Dropdown options={options} onChange={selectCategory}  value={defaultOption} placeholder="Select an option" />
                    </div>
                    <div className="field">
                        <div>
                            <label>Foreground Image</label>
                            <input ref={tempalteforegroundfileInputRef} type="file" name="templatename" accept="image/x-png, image/gif, image/jpeg" value={templateDetails.templatename} onChange={handletemplateinput} />
                        </div>
                        <div>
                            <label>Background Image</label>
                            <input ref={tempaltebackgroundfileInputRef} type="file" name="templatename2" accept="image/x-png, image/gif, image/jpeg" value={templateDetails.templatename2} onChange={handletemplateinput} />
                        </div>
                        <div>
                            <label>Placeholder Image</label>
                            <input ref={tempalteplaceholderfileInputRef} type="file" name="templatename3" accept="image/x-png, image/gif, image/jpeg" value={templateDetails.templatename3} onChange={handletemplateinput} />
                        </div>
                        <div className='submitButton'>
                            <button className="btn btn-primary" type="submit">submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default TemplateForm