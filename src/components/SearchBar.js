import React, { useState } from "react";
import { Input, Radio } from "antd";
import { SEARCH_KEY } from "../constants";
const { Search } = Input;

function SearchBar(props) {
    const [searchType, setSearchType] = useState(SEARCH_KEY.all);
    const [error, setError] = useState("");

    const handleSearch = (value) => {
        console.log(value);
        if (searchType !== SEARCH_KEY.all && value === "") {
            setError("Please input your search keyword!");
            return;
        }
        setError("");
        props.handleSearch({
            type: searchType,
            keyword: value,
        });
    };

    const changeSearchType = (e) => {
        console.log("radio checked", e.target.value);
        setSearchType(e.target.value);
        setError("");
        if (searchType === SEARCH_KEY.all) {
            props.handleSearch({ type: searchType, keyword: "" });
        }
    };

    return (
        <div className="search-bar">
            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                disabled={searchType === SEARCH_KEY.all}
                onSearch={handleSearch}
            />
            <p className="error-msg">{error}</p>

            <Radio.Group
                onChange={changeSearchType}
                value={searchType}
                className="search-type-group"
            >
                <Radio value={SEARCH_KEY.all}>All</Radio>
                <Radio value={SEARCH_KEY.keyword}>Keyword</Radio>
                <Radio value={SEARCH_KEY.user}>User</Radio>
            </Radio.Group>
        </div>
    );
}

export default SearchBar;
