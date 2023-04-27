import {useNavigate} from 'react-router-dom'
import ProjectForm from '../project/ProjectForm'
import styles from './Newproject.module.css'

function Newproject() {
    const Navigate = useNavigate()

    function createPost(project) {
        project.cost = 0
        project.services = []
    

    fetch('http://localhost:5000/projects', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        //redirect
        Navigate('/projects',{state: {message:'Projeto criado com sucesso! '}})
      })
      
    }
    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btntext='Criar Projeto'/>
        </div>
    )
}

export default Newproject