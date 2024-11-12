import React,  {useState} from 'react';
import { Button, Form, Input, Radio, message } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import logo from '../img/logo.png';
import { fetchAddUser } from '../redux/signFormSlice';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Sign = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (newUser) => {
    try {
      dispatch(fetchAddUser(newUser))
      success()
      
    }
    catch {
      error()
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  };
  const [value, setValue] = useState(1)
  const onChange = (e) => {
    setValue(e.target.value)
  }
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'User is registered!',
    })
  };
  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'This user already exists!',
    })
  };
  return (
    <div class='sign'>
      <div class='sign_content'>
        <img class='sign_logo' src={logo} width={60} height={60} alt='logo' />
        <p class='sign_title title'>Регистрация</p>
        <Form name="basic" labelCol={{ span: 8 }} style={{ maxWidth: 600 }}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>

          <Form.Item
            label="Имя"
            name="username"
            layout="vertical"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите имя пользователя!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            layout="vertical"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите email!',
              },
              {
                type: "email",
                message: "Неправильный email!"
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            layout="vertical"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите пароль!',
              },
              {
                pattern: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
                message: 'Пожалуйста, введите корректный пароль!',
              },
            ]}
            tooltip={{
                title: 'Пароль должен содержать не менее 8 символов, включая цифры и заглавные буквы',
                icon: <InfoCircleOutlined />,
              }}
          >
            <Input.Password />
          </Form.Item>
  
          <Form.Item
            label="Пол"
            name="gender"
            layout="vertical"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите пол пользователя!',
              },
              
            ]}
          >
             <Radio.Group onChange={onChange} value={value}>
            <Radio value={'male'}>{<text>Мужчина</text>}</Radio>
            <Radio value={'female'}>{<text>Женщина</text>}</Radio>
          </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Возраст"
            name="age"
            layout="vertical"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите возраст пользователя!',
              },
              {
                pattern: /^\d{2}$|100$/,
                message: 'Пожалуйста, введите корректный возраст!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
          {contextHolder}
            <Button type="primary" htmlType="submit" style={{ width: 150 }}>
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
        <div>Уже есть аккаунт? <Link to="/login">Login!</Link></div>
      </div>
    </div>
  )
}

export default Sign