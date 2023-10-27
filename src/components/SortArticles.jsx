import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSearchParams, createSearchParams } from "react-router-dom";
import { getArticlesBySortTerm } from '../api/api';

const SortArticles = ({ articles, setArticles, topic }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sort, setSort] = useState('descending');
    const sortBy = searchParams.get("sort_by")
    const order = searchParams.get("order")
    const [error, setError] = useState("")
    const displaySortBys = { 
        created_at: "date",
        votes: "votes",
        comment_count: "comments" 
    }

    const handleClick = (sort_by, order) => {
        setSearchParams(
            createSearchParams({ sort_by: sort_by, order: order }))
    }

    useEffect(() => {
        if (order === "asc") {
            setSort("ascending")
        } else {
            setSort("descending")
        }

        getArticlesBySortTerm(topic, sortBy, order)
            .then((response) => {
                setArticles(response.data.articles)
               
            })
            .catch((error) => {
                setError("Sort by or order term does not exist, please try again.")
            })
    }, [sortBy, order])


    function handleError() {
        setError("")
    }

    setTimeout(handleError, 4000);

    return (
        <>
            <section className='dropdown-grid'>
            <Dropdown>
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Sort articles
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => { handleClick("created_at", "desc") }}>
                        Date posted- descending
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => { handleClick("created_at", "asc") }}>
                        Date posted - ascending
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => { handleClick("comment_count", "desc") }}>
                        Comments - descending
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => { handleClick("comment_count", "asc") }}>
                        Comments - ascending
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => { handleClick("votes", "desc") }}>
                        Votes - descending
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => { handleClick("votes", "asc") }}>
                        Votes - ascending
                    </Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>
            <section className='sorting-text'>
            <p style={{ border: "1px solid black", padding: "0.5rem" }}>Sorted by {displaySortBys[sortBy]} in {sort} order</p>
            {error ? <p style={{ border: "1px solid red", padding: "1rem" }}>{error}</p> : null}
            </section>
            </section>
        </>
    );
}

export default SortArticles;