import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { BASE_URL } from "../constants";

function Register(props) {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);

        // note: step1: collect data: username, password
        //  step2: send request to the server
        //  step3: analyze the response
        //  case1: success -> display ok + redirect to login page
        //  case2: fail -> display warning

        const {username, password} = values;
        const opt = {
            method: "POST",
            url: `${BASE_URL}/signup`,
            data: {
                username : username,
                password : password
            },
            headers: { 'content-type': 'application/json'}
        }

        axios(opt)
            .then( response => {
                console.log(response)
                // case1: registered success
                if(response.status === 200) {
                    message.success('Registration succeed!');
                    // note: jump? Link?
                    props.history.push('/login');
                }
            })
            .catch( error => {
                console.log('register failed: ', error.message);
                message.info('Registration failed!');
                // throw new Error('Signup Failed!')
            })
    };

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            className="register"
        >
            <Form.Item
                name="username"
                label="Username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" className="register-btn">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
}



export default Register;