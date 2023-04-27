import {useLocation} from 'react-router-dom'

import Message from "../layout.js/Message"

import Container from '../layout.js/Container'

import Loading from '../layout.js/Loading'

import LinkButton from '../layout.js/LinkButton'

import ProjectCard from '../project/ProjectCard'

import { useState, useEffect } from 'react'

import styles from './Projects.module.css'

function Projects() {
    const [Projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
      fetch('http://localhost:5000/projects',{
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
      }).then(resp => resp.json())
        .then(data => {
           console.log(data)
           setProjects(data)
           setRemoveLoading(true) 
        })
        .catch(err => console.log(err))  
    },[])

    function removeProject(id) {
      fetch(`http://localhost:5000/projects/${id}`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
      })
        .then((resp) => resp.json())
        .then(() => {
          setProjects(Projects.filter((project) => project.id !== id))
          setProjectMessage('Projeto removido com sucesso!')
      })
      
    }

    return (
        <div className={styles.projects_container}>
            <div className={styles.title_container}>
              <h1>Meus Projetos</h1>
              <LinkButton to='/Newproject' text='Criar Projeto'/>
            </div>
            {message && <Message type="succes" msg={message} />}
            {projectMessage && <Message type="succes" msg={projectMessage} />}
            <Container customClass='start' >
               {Projects.length > 0 &&
                 Projects.map((project) => (
                    <ProjectCard 
                        id={project.id}
                        name={project.name}
                        budget={project.budget}
                        category={project.category.name}
                        key={project.id}
                        handleRemove={removeProject}
                        /> 
                      ))}
                {!removeLoading && <Loading />}
                {removeLoading && Projects.length === 0 && (
                  <p>Não há projetos cadastrados</p>
                )}        
                
            </Container>
        </div>
        
    )
}

export default Projects
