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

    const handleClick = (sort_by, order) => {
        setSearchParams(
            createSearchParams({ topic: topic, sort_by: sort_by, order: order }))
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
                setError("")
            })
            .catch((error) => {
                console.log(error)
                setError("Something went wrong, please try again.")

            })
    }, [sortBy, order])

    return (
        <>
            <p>Sorted by {sortBy ? sortBy : "date posted"} in {sort} order</p>
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
            {error ? <p>{error}</p> : null}
        </>
    );
}

export default SortArticles;