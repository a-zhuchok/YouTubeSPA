import React, { useState } from 'react';
import { Button, Form, Input, Radio, message } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import logo from '../img/logo.png';
import { fetchAddUser } from '../redux/signFormSlice';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Sign = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const { status } = useSelector(state => state.newUser);
  const [value, setValue] = useState();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Пользователь зарегистрирован!',
    })
  };
  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Проверьте правильность введенных данных!',
    })
  };
  const onFinish = (newUser) => {
    try {
      dispatch(fetchAddUser(newUser))
      success()
      setTimeout(() => navigate('/login'), 1000)
    }
    catch {
      error()
    }
  };

  return (
    <div class='sign'>
      <div class='sign_content'>
        {status === 'loading' && <p>Загрузка...</p>}
        <img class='sign_logo' src={logo} width={60} height={60} alt='logo' />
        <p class='sign_title title'>Регистрация</p>
        <Form name='basic' labelCol={{ span: 8 }} style={{ maxWidth: 600 }}
          layout='vertical'
          onFinish={onFinish}>

          <Form.Item
            label='Имя'
            name='username'
            layout='vertical'
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
            label='Email'
            name='email'
            layout='vertical'
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите email!',
              },
              {
                type: 'email',
                message: 'Неправильный email!'
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Пароль'
            name='password'
            layout='vertical'
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
            label='Пол'
            name='gender'
            layout='vertical'
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите пол пользователя!',
              },

            ]}
          >
            <Radio.Group onChange={(event)=>setValue(event.target.value)} value={value}>
              <Radio value={'male'}>{<text>Мужчина</text>}</Radio>
              <Radio value={'female'}>{<text>Женщина</text>}</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label='Возраст'
            name='age'
            type='number'
            layout='vertical'
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
            <Button type='primary' htmlType='submit' style={{ width: 150 }}>
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
        <div>Уже есть аккаунт? <Link to='/login'>Login!</Link></div>
      </div>
    </div>
  )
}

export default Sign