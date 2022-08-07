import React, { Component } from "react";
import { Modal, Button, message } from "antd";
import { PostForm } from "./PostForm";
import axios from "axios";
import {TOKEN_KEY } from "../constants";

class CreatePostButton extends Component {
    state = {
        visible: false,
        confirmLoading: false,
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });

        // step1: get file and message
        // step2: send uploading request to server
        // step3: analyze response
        this.postForm
            .validateFields()
            .then((form) => {
                const { description, dragger: uploadPost } = form;
                const { type, originFileObj } = uploadPost[0];
                const postType = type.match(/^(image|video)/g)[0];

                if (postType) {
                    let formData = new FormData();
                    formData.append("message", description);
                    formData.append("media_file", originFileObj);

                    console.log(uploadPost);
                    console.log(formData);

                    const opt = {
                        method: "POST",
                        url: `${process.env['REACT_APP_BASE_URL']}/upload`,
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                TOKEN_KEY
                            )}`,
                        },
                        data: formData,
                    };

                    axios(opt)
                        .then((res) => {
                            if (res.status === 200) {
                                message.success("The image/video is uploaded!");
                                this.postForm.resetFields();
                                this.handleCancel();
                                this.props.onShowPost(postType);
                                this.setState({ confirmLoading: false });
                            }
                        })
                        .catch((err) => {
                            console.log(
                                "Upload image/video failed: ",
                                err.message
                            );
                            message.error("Failed to upload image/video!");
                            this.setState({ confirmLoading: false });
                        });
                }
            })
            .catch((err) => {
                console.log("err in validate form -> ", err);
                this.setState({ confirmLoading: false });
            });
    };

    handleCancel = () => {
        console.log("cancel");
        this.setState({ visible: false, confirmLoading: false });
    };

    render() {
        const { visible, confirmLoading } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Create New Post
                </Button>
                <Modal
                    title="Create New Post"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="Create"
                    confirmLoading={confirmLoading}
                >
                    <PostForm
                        ref={(refInstance) => (this.postForm = refInstance)}
                    />
                </Modal>
            </div>
        );
    }
}

export default CreatePostButton;
