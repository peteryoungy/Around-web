import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { Tabs, message, Col, Row } from "antd";
import { SEARCH_KEY, BASE_URL, TOKEN_KEY } from "../constants";
import axios from "axios";
import PhotoGallery from "./PhotoGallery";
import CreatePostButton from "./CreatePostButton";

const { TabPane } = Tabs;

function Home(props) {
    const [posts, setPosts] = useState([]);
    const [searchOption, setSearchOption] = useState({
        type: SEARCH_KEY.all,
        keyword: "",
    });
    const [activeTab, setActiveTab] = useState("image");

    const renderPosts = (types) => {
        // case1: posts is empty/ not existed -> return
        // case2: type === images -> render <PhotoGallery images>
        // case3: type === videos -> render <video/>

        if (!posts || posts.length === 0) {
            return <div>No data!</div>;
        }
        if (types === "image") {
            //step1:  filter all images
            // step2: check all required fields
            // step3: send images to PhotoGallery
            const images = posts
                .filter((item) => item.type === "image")
                .map((image) => {
                    return {
                        postId: image.id,
                        src: image.url,
                        user: image.user,
                        caption: image.message,
                        thumbnail: image.url,
                        thumbnailWidth: 300,
                        thumbnailHeight: 200,
                    };
                });
            return <PhotoGallery images={images} />;
        } else if (types === "video") {
            // step1:  filter all videos
            // step2: check all required fields
            // step3: send videos to PhotoGallery
            return (
                <Row gutter={32}>
                    {posts
                        .filter((post) => post.type === "video")
                        .map((post) => (
                            <Col span={8} key={post.url}>
                                <video
                                    src={post.url}
                                    controls={true}
                                    className="video-block"
                                />
                                <p>
                                    {post.user}: {post.message}
                                </p>
                            </Col>
                        ))}
                </Row>
            );
        }
    };

    useEffect(() => {
        // console.log("haha")
        // didMount: do search the first time -> search {type: all ,keyword:""}
        // didUpdate: after the first time -> search {type: keyword/user, keyword: text}

        fetchPost(searchOption);
    }, [searchOption]);

    const fetchPost = (option) => {
        // step1: collect search option
        // step2: send search request to the server
        // step3: analyze response
        // case1: success -> pass  post to gallery
        // case2: fail - > warning

        const { type, keyword } = option;
        let url = "";

        if (type === SEARCH_KEY.all) {
            url = `${BASE_URL}/search`;
        } else if (type === SEARCH_KEY.user) {
            url = `${BASE_URL}/search?user=${keyword}`;
        } else {
            url = `${BASE_URL}/search?keywords=${keyword}`;
        }

        const opt = {
            method: "GET",
            url: url,
            headers: {
                Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
            },
        };

        axios(opt)
            .then((res) => {
                if (res.status === 200) {
                    // send post to gallery
                    setPosts(res.data);
                    console.log(res.data);
                }
            })
            .catch((err) => {
                message.error("Fetch posts failed!");
                console.log("fetch posts failed: ", err.message);
            });
    };

    const handleSearch = (option) => {
        const { type, keyword } = option;
        setSearchOption({
            type: type,
            keyword: keyword,
        });
    };

    const showPost = (type) => {
        // inform home to load all posts
        console.log("type -> ", type);
        setActiveTab(type);

        // allow 3 sec in db
        setTimeout(() => {
            setSearchOption({ type: SEARCH_KEY.all, keyword: "" });
        }, 3000);
    };

    const operations = <CreatePostButton onShowPost={showPost} />;

    return (
        <div className="home">
            <SearchBar handleSearch={handleSearch} />
            <div className="display">
                <Tabs
                    defaultActiveKey="image"
                    onChange={(key) => {
                        console.log(key);
                        setActiveTab(key);
                    }}
                    activeKey={activeTab}
                    tabBarExtraContent={operations}
                >
                    <TabPane tab="Images" key="image">
                        {renderPosts("image")}
                    </TabPane>
                    <TabPane tab="Videos" key="video">
                        {renderPosts("video")}
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}

export default Home;
