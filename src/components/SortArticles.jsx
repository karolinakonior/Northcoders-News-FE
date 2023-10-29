import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSearchParams, createSearchParams } from "react-router-dom";
import { getArticlesBySortTerm } from '../api/api';
import { DropdownButton } from 'react-bootstrap';

const SortArticles = ({ setArticles, topic }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sort, setSort] = useState('descending');
    const sortBy = searchParams.get("sort_by");
    const order = searchParams.get("order");
    const [error, setError] = useState("");
    const [selectedSortBy, setSelectedSortBy] = useState(1);

    const displaySortBys = {
        created_at: "date",
        votes: "votes",
        comment_count: "comments"
    };

    const handleClick = (sort_by, order, itemKey) => {
        setSearchParams(
            createSearchParams({ sort_by: sort_by, order: order })
        )

        setSelectedSortBy(itemKey);
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

    const setActiveSortBy = (itemKey) => {
        return selectedSortBy === itemKey ? "dropdown-item-checked" : "";
    }

    function handleError() {
        setError("")
    }

    setTimeout(handleError, 4000);

    return (
        <section className='dropdown-grid'>
            <Dropdown align="end">
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Sort articles
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ paddingRight: "0.5rem" }}>

                    <Dropdown.Item className={setActiveSortBy(1)} onClick={() => { handleClick("created_at", "desc", 1) }}>
                        Date posted - descending
                    </Dropdown.Item>
                    <Dropdown.Item className={setActiveSortBy(2)} onClick={() => { handleClick("created_at", "asc", 2) }}>
                        Date posted - ascending
                    </Dropdown.Item>
                    <Dropdown.Item className={setActiveSortBy(3)} onClick={() => { handleClick("comment_count", "desc", 3) }}>
                        Comments - descending
                    </Dropdown.Item>
                    <Dropdown.Item className={setActiveSortBy(4)} onClick={() => { handleClick("comment_count", "asc", 4) }}>
                        Comments - ascending
                    </Dropdown.Item>
                    <Dropdown.Item className={setActiveSortBy(5)} onClick={() => { handleClick("votes", "desc", 5) }}>
                        Votes - descending
                    </Dropdown.Item>
                    <Dropdown.Item className={setActiveSortBy(6)} onClick={() => { handleClick("votes", "asc", 6) }}>
                        Votes - ascending
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <section className='sorting-text'>
                {error ? <p style={{ border: "1px solid red", padding: "1rem" }}>{error}</p> : null}
            </section>
        </section>
    );
}

export default SortArticles;