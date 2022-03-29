import React, { useCallback } from 'react'
import './list.css'
import Spinner from './spinner';


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
        }) ;
    }, []);

    React.useEffect(() => {
         getItems()
    }, [getItems]);

    if (!dataIsLoaded) {
        return (
			<>
				<Spinner />
			</>
		)
    }

        return (
            <ul>
                {
                    data.map((item) => {
                        return (<li className='list-item' key={item.id}> 
                            {item.id} | {item.status} | {item.conclusion}
                        </li>)
                    })
                }
            </ul>
        );
}

export default List;