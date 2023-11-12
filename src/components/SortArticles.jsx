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

    const sorts = [
        { name: "Date posted - descending", sortBy: "created_at", direction: "desc" },
        { name: "Date posted - ascending", sortBy: "created_at", direction: "asc" },
        { name: "Comments - descending", sortBy: "comment_count", direction: "desc" },
        { name: "Comments - ascending", sortBy: "comment_count", direction: "asc" },
        { name: "Votes - descending", sortBy: "votes", direction: "desc" },
        { name: "Votes - ascending", sortBy: "votes", direction: "asc" }
    ]

    return (
        <section className='dropdown-grid'>
            <Dropdown align="end">
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Sort articles
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ paddingRight: "0.5rem" }}>
                    {
                        sorts.map((item, index) => {
                            return <Dropdown.Item key={`sortBy_${index}`} className={setActiveSortBy(index)} onClick={() => { handleClick(item.sortBy, item.direction, index) }}>
                                {item.name}
                            </Dropdown.Item>
                        })
                    }
                </Dropdown.Menu>
            </Dropdown>
            <section className='sorting-text'>
                {error ? <p style={{ border: "1px solid red", padding: "1rem" }}>{error}</p> : null}
            </section>
        </section>
    );
}

export default SortArticles;