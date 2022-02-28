import React from 'react';
import { Form, Upload, Input } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import {forwardRef} from "react";

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};


const normFile = (e) => {
    // get file
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }

    return e && e.fileList;
};

export const PostForm = forwardRef((props, formRef) => {

    return (
        <Form
            name="validate_other"
            {...formItemLayout}
        >
            <Form.Item
                name="description"
                label="Message"
                rules={[
                    {
                        required: true,
                        message: "Please input your E-mail!"
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item label="Dragger">
                <Form.Item
                    name="dragger"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    noStyle
                    rules={[
                        {
                            required: true,
                            message: "Please input your E-mail!"
                        }
                    ]}
                >
                    <Upload.Dragger
                        name="files"
                        beforeUpload={() => false}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                </Form.Item>
            </Form.Item>

        </Form>
    )
});