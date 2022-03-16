import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCross, faLink, faXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useCallback } from 'react'
import './list.css'


// https://api.github.com/repos/mikkelzu/onlycodes/actions/runs/1953308688/jobs TODO: make singular jobs
const List = () => {
    const [data, setData] = React.useState([]);
    const [dataIsLoaded, setDataIsLoaded] = React.useState(false);

    const getItems = useCallback(() => {
        fetch("https://api.github.com/repos/mikkelzu/onlycodes/actions/runs")
            .then((res) => res.json())
            .then((json) => {
                setData(json.workflow_runs);
                setDataIsLoaded(true);
            });
    }, []);

    React.useEffect(() => {
        getItems()
    }, [getItems]);

    console.log(data)

    if (!dataIsLoaded) {
        return <><h1>Loading...</h1></>
    }

    return (
        <ul>
            {
                data.map((item) => {
                    return (
                        <li className='list-item' key={item.id}>
                            <span className='id'>
                                {item.name}
                            </span>

                            <FontAwesomeIcon icon={item.conclusion === 'success' ? faCheck : faXmark} />

                            <span className="time">
                                {new Date(item.created_at).toLocaleString()}
                            </span>

                            <span className="author">
                                <a href={item.actor.html_url}>
                                    Issued by: {item.actor.login}
                                </a>
                            </span>

                            <span className="link">
                                <a href={item.repository.html_url}>Link <FontAwesomeIcon icon={faLink} /></a>
                            </span>
                        </li>
                    )
                })
            }
        </ul>
    );
}

export default List;