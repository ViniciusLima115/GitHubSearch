import { useEffect, useState } from "react"

import styles from './ReposList.module.css'

const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
            .then(res => res.json())
            .then(resJson => {
                setTimeout(() => {
                    setLoading(false)
                    setRepos(resJson)
                }, 3000)
            })
    }, [nomeUsuario]);

    return (
        <div className="container">
            <h1>Repositorios</h1>
            {loading ? (
                <h2>Carregando....</h2>

            ) : (
                <ul className={styles.list}>
                    {repos.map(({ id, name, language, html_url }) => (
                        <li className={styles.listItem} key={id}>
                            <div className={styles.itemName}>
                                <b >Nome:</b>{name}
                            </div>
                            <div className={styles.itemLanguage}>
                                <b >Linguagem:</b>{language}
                            </div>
                            <a target="_blank" className={styles.itemLink} href={html_url}>Visite no Github</a>

                        </li>
                    ))}
                </ul>
            )}

        </div>
    )



}

export default ReposList