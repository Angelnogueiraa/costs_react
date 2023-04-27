import {useState, useEffect} from 'react'
import Input from '../form.js/Input'
import Select from '../form.js/Select'
import styles from './ProjectForm.module.css'
import SubmitButton from '../form.js/SubmitButton'

function ProjectForm ({handleSubmit, btntext, projectdata}) {
    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectdata || {})

    useEffect(()=> {
        fetch('http://localhost:5000/categories',{
            method:'GET',
            headers: {'Content-Type': 'application/json',

            },
        })
          .then((resp)=> resp.json())
          .then((data)=> {
            setCategories(data)
          })
    },[])

        const submit = (e) => {
            e.preventDefault()
            handleSubmit(project)
        }

        function handlechange(e) {
            setProject({...project,[e.target.name]: e.target.value})
        }

        function handleCategory(e) {
            setProject({
                ...project,
                category: {
                    id: e.target.value,
                    name: e.target.options[e.target.selectedIndex].text,
                },
               })   
        }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input type='text' 
                   text='Nome do Projeto' 
                   name='name' 
                   placeholder='Insira o nome do projeto' 
                   handleOnchange={handlechange} 
                   value={project.name}/>

            <Input type='number' 
                   text='Orçamento do Projeto' 
                   name='budget' 
                   placeholder='Insira o Orçamento total ' 
                   handleOnchange={handlechange} 
                   value={project.budget}/>
           
           <Select name='category_id' 
                   text='selecione a categoria' 
                   options={categories} 
                   handleOnchange={handleCategory} 
                   value={project.category ? project.category.id: ''}/>
            <SubmitButton text={btntext} />
        </form>
    )
}

export default ProjectForm